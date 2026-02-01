// server/cloudflare/cli.js
const fs = require("fs");
const path = require("path");

const {
	S3Client,
	PutObjectCommand,
	ListObjectsV2Command,
} = require("@aws-sdk/client-s3");

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

function slugContainer(containerId = "") {
	return String(containerId)
		.normalize("NFKD")
		.replace(/[^a-zA-Z0-9/_-]+/g, "_")
		.replace(/\/+/g, "/")
		.replace(/^\//, "")
		.replace(/\/$/, "")
		.slice(0, 120);
}

function guessMimeByExt(filename = "") {
	const ext = path.extname(filename).toLowerCase();
	if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
	if (ext === ".png") return "image/png";
	if (ext === ".webp") return "image/webp";
	if (ext === ".gif") return "image/gif";
	if (ext === ".svg") return "image/svg+xml";
	if (ext === ".pdf") return "application/pdf";
	if (ext === ".zip") return "application/zip";
	if (ext === ".txt") return "text/plain";
	if (ext === ".json") return "application/json";
	return "application/octet-stream";
}

/**
 * Mandatory key format for this module:
 *   <containerId>/<fileId>/<variant><ext?>
 *
 * For CLI: fileId is always "default"
 */
function makeKey({ containerId, fileId, variant, name } = {}) {
	const c = slugContainer(containerId);
	if (!c) throw new Error("container is required");

	const f = String(fileId || "").trim();
	if (!f) throw new Error("fileId is required");

	const v = String(variant || "").trim();
	if (!v) throw new Error("variant is required");

	const ext = safeExtFromName(name || "");
	return `${c}/${f}/${v}${ext}`;
}

function makeClient(cfg) {
	const accountId = cfg.accountId;
	const endpoint =
		cfg.endpoint ||
		(accountId ? `https://${accountId}.r2.cloudflarestorage.com` : null);

	if (!endpoint)
		throw new Error(
			"cloudflare.endpoint or cloudflare.accountId is required",
		);
	if (!cfg.bucket) throw new Error("cloudflare.bucket is required");
	if (!cfg.accessKeyId) throw new Error("cloudflare.accessKeyId is required");
	if (!cfg.secretAccessKey)
		throw new Error("cloudflare.secretAccessKey is required");

	const client = new S3Client({
		region: "auto",
		endpoint,
		credentials: {
			accessKeyId: cfg.accessKeyId,
			secretAccessKey: cfg.secretAccessKey,
		},
		forcePathStyle: true,
	});

	return {
		bucket: cfg.bucket,
		endpoint: ensureNoTrailingSlash(endpoint),
		publicBaseUrl: cfg.publicBaseUrl
			? ensureNoTrailingSlash(cfg.publicBaseUrl)
			: "",
		client,
	};
}

function usage() {
	console.log(
		`
Usage:
  waw cloudflare upload <container> <localPath>
  waw cloudflare list <container>

Notes:
  - fileId is fixed to "default"
  - upload key is: <container>/default/original.<ext>

Examples:
  waw cloudflare upload general ./default.jpg
  waw cloudflare list general
`.trim(),
	);
}

async function upload(waw) {
	const cfg = waw?.config?.cloudflare;
	if (!cfg) throw new Error("missing waw.config.cloudflare");

	const container = process.argv[4];
	const localPath = process.argv[5];

	if (!container || !localPath) {
		usage();
		return;
	}

	const abs = path.resolve(process.cwd(), localPath);
	if (!fs.existsSync(abs)) {
		throw new Error(`file not found: ${abs}`);
	}

	const s3 = makeClient(cfg);

	const name = path.basename(abs);
	const mime = guessMimeByExt(name);

	const key = makeKey({
		containerId: container,
		fileId: "default",
		variant: "original",
		name,
	});

	await s3.client.send(
		new PutObjectCommand({
			Bucket: s3.bucket,
			Key: key,
			Body: fs.createReadStream(abs),
			ContentType: mime,
		}),
	);

	const publicUrl = s3.publicBaseUrl
		? `${s3.publicBaseUrl}/${encodeURI(key).replace(/%2F/g, "/")}`
		: null;

	console.log("[cloudflare] uploaded");
	console.log("  bucket:", s3.bucket);
	console.log("  key   :", key);
	if (publicUrl) console.log("  url   :", publicUrl);
}

async function list(waw) {
	const cfg = waw?.config?.cloudflare;
	if (!cfg) throw new Error("missing waw.config.cloudflare");

	const container = process.argv[4];
	if (!container) {
		usage();
		return;
	}

	const s3 = makeClient(cfg);

	// As requested: list only container/default/*
	const prefix = `${slugContainer(container)}/default/`;

	const res = await s3.client.send(
		new ListObjectsV2Command({
			Bucket: s3.bucket,
			Prefix: prefix,
			MaxKeys: 1000,
		}),
	);

	const items = res.Contents || [];
	if (!items.length) {
		console.log("[cloudflare] empty:", prefix);
		return;
	}

	console.log(`[cloudflare] ${items.length} object(s) under ${prefix}`);
	for (const o of items) {
		console.log(`- ${o.Key} (${o.Size} bytes)`);
	}
}

module.exports.cloudflare = {
	upload,
	list,
};
