module.exports = async (waw) => {
	const crud = {
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
			ensure: waw.role("admin"),
		},
		update: {
			ensure: waw.role("admin"),
			query: (resp) => {
				return {
					_id: resp._id,
				};
			},
		},
		delete: {
			ensure: waw.role("admin"),
			query: (resp) => {
				return {
					_id: resp._id,
				};
			},
		},
	};
	waw.crud("translate", crud);
	waw.crud("translatephrase", crud);
	waw.crud("translatelanguage", crud);
};
