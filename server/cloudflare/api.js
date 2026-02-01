// server/cloudflare/api.js
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

	const router = waw.router("/api/file");

	/**
	 * POST /api/file/upload-intent
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
				status: "pending",
				createdAt: Date.now(),
			};

			mem.set(id, record);

			res.json({
				id,
				key,
				prefix,
				uploadUrl,
				headers: { "Content-Type": mime },
				publicUrl: provider.getPublicUrl(key),
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ error: "internal error" });
		}
	});

	router.post("/confirm", (req, res) => {
		const { id } = req.body || {};
		const rec = mem.get(id);
		if (!rec) return res.status(404).json({ error: "not found" });
		rec.status = "uploaded";
		res.json({ ok: true, file: rec });
	});

	router.get("/:id/url", async (req, res) => {
		const rec = mem.get(req.params.id);
		if (!rec) return res.status(404).json({ error: "not found" });

		const url =
			provider.getPublicUrl(rec.key) ||
			(await provider.signDownload({ key: rec.key }));

		res.json({ url });
	});

	router.delete("/:id", async (req, res) => {
		const rec = mem.get(req.params.id);
		if (!rec) return res.status(404).json({ error: "not found" });

		await provider.deletePrefix({ prefix: rec.prefix });
		mem.delete(req.params.id);

		res.json({ ok: true });
	});
};
