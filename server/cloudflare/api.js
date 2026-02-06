const crypto = require("crypto");

module.exports = async function (waw) {
	if (!waw?.config?.cloudflare) return;

	const { createCloudflare } = require("./util.cloudflare");

	// attach module namespace
	waw.cloudflare = waw.cloudflare || {};
	waw.cloudflare.provider = waw.cloudflare.provider || createCloudflare(waw);

	const provider = waw.cloudflare.provider;

	const maxUploadMb = Number(waw.config.cloudflare.maxUploadMb || 50);
	const maxUploadBytes = maxUploadMb * 1024 * 1024;
	const allowedMime = waw.config.cloudflare.allowedMime || null;

	const mem = (waw.cloudflare._mem = waw.cloudflare._mem || new Map());

	function mimeAllowed(mime) {
		if (!allowedMime) return true;
		return allowedMime.some(
			(m) =>
				m === mime ||
				(m.endsWith("/*") && mime.startsWith(m.slice(0, -1))),
		);
	}

	// you renamed the base
	const router = waw.router("/api/cloudflare");

	/**
	 * POST /api/cloudflare/upload-intent
	 * body: { container, name, mime, size }
	 */
	router.post("/upload-intent", async (req, res) => {
		try {
			const { container, name = "file", mime, size } = req.body || {};

			if (!container)
				return res.status(400).json({ error: "container required" });
			if (!size || size > maxUploadBytes)
				return res.status(413).json({ error: "invalid size" });
			if (mime && !mimeAllowed(mime))
				return res.status(415).json({ error: "mime not allowed" });

			const id = crypto.randomUUID();

			const key = provider.makeKey({
				containerId: container,
				fileId: id,
				variant: "original",
				name,
			});

			const prefix = provider.makePrefix({
				containerId: container,
				fileId: id,
			});

			const uploadUrl = await provider.signUpload({
				key,
				contentType: mime || "application/octet-stream",
			});

			const record = {
				id,
				container,
				key,
				prefix,
				name,
				mime: mime || "application/octet-stream",
				status: "pending",
				createdAt: Date.now(),
			};

			mem.set(id, record);

			res.json({
				id,
				key,
				prefix,
				uploadUrl,
				headers: { "Content-Type": mime || "application/octet-stream" },
				publicUrl: provider.getPublicUrl(key),
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ error: "internal error" });
		}
	});

	/**
	 * POST /api/cloudflare/confirm
	 * body: { id }
	 */
	router.post("/confirm", (req, res) => {
		const { id } = req.body || {};
		const rec = mem.get(id);
		if (!rec) return res.status(404).json({ error: "not found" });
		rec.status = "uploaded";
		res.json({ ok: true, file: rec });
	});

	/**
	 * GET /api/cloudflare/:id/url
	 */
	router.get("/:id/url", async (req, res) => {
		const rec = mem.get(req.params.id);
		if (!rec) return res.status(404).json({ error: "not found" });

		const url =
			provider.getPublicUrl(rec.key) ||
			(await provider.signDownload({ key: rec.key }));

		res.json({ url });
	});

	/**
	 * DELETE /api/cloudflare/:id
	 */
	router.delete("/:id", async (req, res) => {
		const rec = mem.get(req.params.id);
		if (!rec) return res.status(404).json({ error: "not found" });

		await provider.deletePrefix({ prefix: rec.prefix });
		mem.delete(req.params.id);

		res.json({ ok: true });
	});

	function parseBase64Input({ base64, dataUrl, mime }) {
		// Returns: { mime, base64 }
		if (dataUrl) {
			const m = String(dataUrl).match(/^data:([^;]+);base64,(.+)$/);
			if (!m) throw new Error("invalid dataUrl format");
			return { mime: m[1], base64: m[2] };
		}
		if (!base64) throw new Error("base64 or dataUrl required");
		return {
			mime: mime || "application/octet-stream",
			base64: String(base64),
		};
	}

	function cleanBase64(b64) {
		// tolerate whitespace/newlines
		return String(b64).replace(/\s+/g, "");
	}

	/**
	 * POST /api/cloudflare/upload-base64
	 * body: { container, name, mime?, base64?, dataUrl? }
	 *
	 * Note: base64 in JSON adds ~33% overhead. Ensure your express.json({limit}) is large enough.
	 */
	router.post("/upload-base64", async (req, res) => {
		try {
			const { container, name = "file" } = req.body || {};
			if (!container)
				return res.status(400).json({ error: "container required" });

			const parsed = parseBase64Input(req.body || {});
			const mime = parsed.mime || "application/octet-stream";

			if (mime && !mimeAllowed(mime))
				return res.status(415).json({ error: "mime not allowed" });

			const b64 = cleanBase64(parsed.base64);

			let buf;
			try {
				buf = Buffer.from(b64, "base64");
			} catch {
				return res.status(400).json({ error: "invalid base64" });
			}

			if (!buf?.length)
				return res.status(400).json({ error: "empty file" });
			if (buf.length > maxUploadBytes)
				return res.status(413).json({ error: "invalid size" });

			const id = crypto.randomUUID();

			const key = provider.makeKey({
				containerId: container,
				fileId: id,
				variant: "original",
				name,
			});

			const prefix = provider.makePrefix({
				containerId: container,
				fileId: id,
			});

			const uploadUrl = await provider.signUpload({
				key,
				contentType: mime,
			});

			// Upload bytes from server to R2 signed URL
			// (Do not force Content-Length; node fetch will handle it.)
			const put = await fetch(uploadUrl, {
				method: "PUT",
				headers: {
					"Content-Type": mime,
				},
				body: buf,
			});

			if (!put.ok) {
				const text = await put.text().catch(() => "");
				return res.status(502).json({
					error: "upload failed",
					status: put.status,
					details: text.slice(0, 300),
				});
			}

			const record = {
				id,
				container,
				key,
				prefix,
				name,
				mime,
				size: buf.length,
				status: "uploaded",
				createdAt: Date.now(),
			};

			mem.set(id, record);

			res.json({
				ok: true,
				id,
				key,
				prefix,
				publicUrl: provider.getPublicUrl(key),
				file: record,
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ error: "internal error" });
		}
	});
};
