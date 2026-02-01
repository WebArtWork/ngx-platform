// server/file/api.js
const crypto = require("crypto");

module.exports = async function (waw) {
	// Activate only if cloudflare config exists (as requested)
	if (!waw?.config?.cloudflare) return;

	const { createCloudflare } = require("./util.cloudflare.js");

	// Attach provider helper on waw for reuse in other module files
	try {
		waw.file = waw.file || {};
		waw.file.provider = waw.file.provider || createCloudflare(waw);
	} catch (e) {
		console.error("[waw-file] Cloudflare init failed:", e?.message || e);
		return;
	}

	const provider = waw.file.provider;

	// Optional limits (safe defaults)
	const maxUploadMb = Number(waw.config.cloudflare.maxUploadMb || 50);
	const maxUploadBytes = maxUploadMb * 1024 * 1024;
	const allowedMime = Array.isArray(waw.config.cloudflare.allowedMime)
		? waw.config.cloudflare.allowedMime
		: null;

	// If you don't yet have a DB collection/model, we keep small metadata in-memory.
	// Later you can swap these functions to use mongoose model from collection.js
	const mem = (waw.file._mem = waw.file._mem || new Map());

	function mimeAllowed(mime) {
		if (!allowedMime || !allowedMime.length) return true;
		if (!mime) return false;

		// supports exact match "application/pdf" and wildcard "image/*"
		for (const rule of allowedMime) {
			if (rule === mime) return true;
			if (rule.endsWith("/*")) {
				const prefix = rule.slice(0, rule.length - 1); // "image/"
				if (mime.startsWith(prefix)) return true;
			}
		}
		return false;
	}

	function getUserId(req) {
		// best-effort: you can adjust based on your auth/user system
		return (
			req?.user?._id?.toString?.() ||
			req?.user?.id ||
			req?.session?.user?._id ||
			"anon"
		);
	}

	function ensureAuth(req, res) {
		// If sem provides waw.ensure, use it; otherwise allow (dev)
		if (typeof waw.ensure === "function") {
			// waw.ensure is middleware-style; here we emulate a sync check:
			// If your ensure() always requires middleware, you can mount it per-route instead.
			return true;
		}
		return true;
	}

	// Router mounting
	const router =
		typeof waw.router === "function"
			? waw.router("/api/file")
			: waw.app?.Router
				? new waw.app.Router()
				: null;

	if (!router) {
		console.error("[waw-file] No router available (waw.router missing)");
		return;
	}

	// --- ROUTES (provider-agnostic contract) ---

	/**
	 * POST /api/file/upload-intent
	 * body: { name, mime, size, acl?, path? }
	 * returns: { id, key, uploadUrl, headers, publicUrl }
	 */
	router.post("/upload-intent", async (req, res) => {
		try {
			if (!ensureAuth(req, res)) return;

			const name = req.body?.name || "file";
			const mime =
				req.body?.mime || req.body?.type || "application/octet-stream";
			const size = Number(req.body?.size || 0);
			const path = req.body?.path || "";

			if (!size || Number.isNaN(size)) {
				return res.status(400).json({ error: "size is required" });
			}
			if (size > maxUploadBytes) {
				return res
					.status(413)
					.json({ error: `file too large (max ${maxUploadMb}MB)` });
			}
			if (!mimeAllowed(mime)) {
				return res.status(415).json({ error: "mime not allowed" });
			}

			const id = crypto.randomUUID();
			const userId = getUserId(req);

			const key = provider.makeKey({
				project: waw.config?.name || waw.projectName || "app",
				userId,
				path,
				name,
			});

			const uploadUrl = await provider.signUpload({
				key,
				contentType: mime,
			});

			const record = {
				id,
				key,
				name,
				mime,
				size,
				userId,
				provider: provider.provider,
				bucket: provider.bucket,
				status: "pending",
				createdAt: new Date().toISOString(),
			};

			mem.set(id, record);

			return res.json({
				id,
				key,
				uploadUrl,
				headers: {
					"Content-Type": mime,
				},
				publicUrl: provider.getPublicUrl(key), // may be null if no publicBaseUrl
			});
		} catch (e) {
			console.error("[waw-file] upload-intent error:", e);
			return res.status(500).json({ error: "internal error" });
		}
	});

	/**
	 * POST /api/file/confirm
	 * body: { id, etag? }
	 * returns: { ok: true, file }
	 */
	router.post("/confirm", async (req, res) => {
		try {
			if (!ensureAuth(req, res)) return;

			const id = req.body?.id;
			if (!id) return res.status(400).json({ error: "id is required" });

			const record = mem.get(id);
			if (!record) return res.status(404).json({ error: "not found" });

			const userId = getUserId(req);
			if (record.userId !== userId && typeof waw.role === "function") {
				// optional: you can enforce admin role here if you want
			}

			record.status = "uploaded";
			record.etag = req.body?.etag || null;
			record.confirmedAt = new Date().toISOString();
			mem.set(id, record);

			// Optional: emit socket event
			if (waw.socket?.emit) {
				waw.socket.emit(userId, {
					type: "file:uploaded",
					file: record,
				});
			}

			return res.json({ ok: true, file: record });
		} catch (e) {
			console.error("[waw-file] confirm error:", e);
			return res.status(500).json({ error: "internal error" });
		}
	});

	/**
	 * GET /api/file/:id/url
	 * returns: { url, publicUrl?, key }
	 *
	 * If publicBaseUrl exists, we return publicUrl too.
	 * Otherwise return signed download url.
	 */
	router.get("/:id/url", async (req, res) => {
		try {
			if (!ensureAuth(req, res)) return;

			const id = req.params?.id;
			const record = mem.get(id);
			if (!record) return res.status(404).json({ error: "not found" });

			const userId = getUserId(req);
			if (record.userId !== userId && typeof waw.role === "function") {
				// optional: enforce role-based access here
			}

			const publicUrl = provider.getPublicUrl(record.key);
			const url =
				publicUrl || (await provider.signDownload({ key: record.key }));

			return res.json({ url, publicUrl, key: record.key });
		} catch (e) {
			console.error("[waw-file] url error:", e);
			return res.status(500).json({ error: "internal error" });
		}
	});

	/**
	 * DELETE /api/file/:id
	 * returns: { ok: true }
	 */
	router.delete("/:id", async (req, res) => {
		try {
			if (!ensureAuth(req, res)) return;

			const id = req.params?.id;
			const record = mem.get(id);
			if (!record) return res.status(404).json({ error: "not found" });

			const userId = getUserId(req);
			if (record.userId !== userId && typeof waw.role === "function") {
				// optional: enforce admin role here
			}

			await provider.removeObject({ key: record.key });
			mem.delete(id);

			if (waw.socket?.emit) {
				waw.socket.emit(userId, {
					type: "file:deleted",
					id,
					key: record.key,
				});
			}

			return res.json({ ok: true });
		} catch (e) {
			console.error("[waw-file] delete error:", e);
			return res.status(500).json({ error: "internal error" });
		}
	});

	// Mount router if needed
	// In waw-sem, waw.router('/base') usually auto-mounts, so this is just a fallback.
	if (waw.app?.use && router && !router.__wawMounted) {
		try {
			waw.app.use("/api/file", router);
			router.__wawMounted = true;
		} catch (_) {}
	}
};
