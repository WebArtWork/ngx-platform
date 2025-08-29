module.exports = async (waw) => {
	// await waw.Translatephrase.deleteMany({});
	// await waw.Translatelanguage.deleteMany({});
	// await waw.Translate.deleteMany({});
	const crud = (model) => {
		const ensure = async (req, res, next) => {
			req.body = req.body || {};

			if (
				model &&
				(!req.body.text ||
					(await model.countDocuments({
						text: req.body.text,
					})))
			) {
				res.json(false);
			} else {
				next();
			}
		};

		return {
			get: {
				ensure: waw.next,
				query: () => {
					return {};
				},
			},
			fetch: {
				ensure: waw.next,
				query: (resp) => {
					return {
						_id: resp._id,
					};
				},
			},
			create: {
				ensure,
			},
			update: {
				ensure,
				query: (resp) => {
					return {
						_id: resp._id,
					};
				},
			},
			delete: {
				ensure,
				query: (resp) => {
					return {
						_id: resp._id,
					};
				},
			},
		};
	};
	waw.crud("translate", crud(waw.Translate));
	waw.crud("translatephrase", crud(waw.Translatephrase));
	waw.crud("translatelanguage", crud());
};
