module.exports = async function (waw) {
	const crud = {
		create: {
			ensure: waw.role("admin", (req, res, next) => {
				req.body.domain = req.get("host");

				next();
			}),
		},
		get: {
			ensure: waw.next,
			query: (req) => {
				return req.queryParsed.appId
					? { appId: req.queryParsed.appId }
					: { domain: req.get("host") };
			},
		},
		fetch: {
			ensure: waw.next,
			query: (req) => {
				return {
					_id: req.body._id,
				};
			},
		},
		update: {
			ensure: waw.role("admin"),
			query: (req) => {
				return {
					_id: req.body._id,
				};
			},
		},
		delete: {
			ensure: waw.role("admin"),
			query: (req) => {
				return {
					_id: req.body._id,
				};
			},
		},
	};
	waw.crud("form", crud);
	waw.crud("formcomponent", crud);
};
