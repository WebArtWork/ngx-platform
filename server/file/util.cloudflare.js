// server/file/util.cloudflare.js
const crypto = require("crypto");
const {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
	DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

function ensureNoTrailingSlash(s) {
	if (!s) return s;
	return s.endsWith("/") ? s.slice(0, -1) : s;
}

function safeExtFromName(name = "") {
	const idx = name.lastIndexOf(".");
	if (idx <= 0) return "";
	const ext = name
		.slice(idx + 1)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "");
	return ext ? `.${ext}` : "";
}

function slugName(name = "file") {
	return (
		String(name)
			.normalize("NFKD")
			.replace(/[^\w.\- ]+/g, "")
			.trim()
			.replace(/\s+/g, "_")
			.slice(0, 80) || "file"
	);
}

function makeKey({
	project = "app",
	userId = "anon",
	path = "",
	name = "file",
} = {}) {
	const yyyy = new Date().getFullYear();
	const mm = String(new Date().getMonth() + 1).padStart(2, "0");
	const rand = crypto.randomUUID();
	const ext = safeExtFromName(name);
	const base = slugName(name).replace(/\.[^.]+$/, ""); // strip ext for nicer key
	const cleanPath = String(path || "").replace(/\\/g, "/");
	replace(/^\//, "")
		.replace(/\.\./g, "")
		.replace(/\/\/+/g, "/")
		.replace(/[^a-zA-Z0-9/_\-]+/g, "_")
		.slice(0, 120);

	const parts = [
		project,
		String(userId || "anon"),
		String(yyyy),
		String(mm),
		cleanPath ? cleanPath : null,
		`${rand}_${base}${ext}`,
	].filter(Boolean);

	return parts.join("/");
}

function createCloudflare(waw) {
	const cfg = waw?.config?.cloudflare || {};
	if (!cfg.bucket)
		throw new Error("waw.config.cloudflare.bucket is required");
	if (!cfg.accessKeyId)
		throw new Error("waw.config.cloudflare.accessKeyId is required");
	if (!cfg.secretAccessKey)
		throw new Error("waw.config.cloudflare.secretAccessKey is required");

	const accountId = cfg.accountId || cfg.account_id;
	const endpoint =
		cfg.endpoint ||
		(accountId ? `https://${accountId}.r2.cloudflarestorage.com` : null);

	if (!endpoint) {
		throw new Error(
			"waw.config.cloudflare.endpoint or accountId is required",
		);
	}

	const client = new S3Client({
		region: cfg.region || "auto",
		endpoint,
		credentials: {
			accessKeyId: cfg.accessKeyId,
			secretAccessKey: cfg.secretAccessKey,
		},
		// R2 is S3-compatible; path-style is typically fine
		forcePathStyle: cfg.forcePathStyle !== false,
	});

	const publicBaseUrl = ensureNoTrailingSlash(
		cfg.publicBaseUrl || cfg.public_base_url || "",
	);

	const expiresSeconds = Number(
		cfg.expiresSeconds || cfg.signExpiresSeconds || 900,
	);

	function getPublicUrl(key) {
		if (!publicBaseUrl) return null;
		return `${publicBaseUrl}/${encodeURI(key).replace(/%2F/g, "/")}`;
	}

	async function signUpload({ key, contentType, expires = expiresSeconds }) {
		const cmd = new PutObjectCommand({
			Bucket: cfg.bucket,
			Key: key,
			ContentType: contentType || "application/octet-stream",
			// ACL not supported like AWS; rely on bucket policy
		});
		return getSignedUrl(client, cmd, { expiresIn: expires });
	}

	async function signDownload({ key, expires = expiresSeconds }) {
		const cmd = new GetObjectCommand({
			Bucket: cfg.bucket,
			Key: key,
		});
		return getSignedUrl(client, cmd, { expiresIn: expires });
	}

	async function removeObject({ key }) {
		const cmd = new DeleteObjectCommand({
			Bucket: cfg.bucket,
			Key: key,
		});
		return client.send(cmd);
	}

	return {
		provider: "cloudflare",
		client,
		bucket: cfg.bucket,
		endpoint,
		publicBaseUrl,
		expiresSeconds,
		makeKey,
		getPublicUrl,
		signUpload,
		signDownload,
		removeObject,
	};
}

module.exports = {
	createCloudflare,
};
