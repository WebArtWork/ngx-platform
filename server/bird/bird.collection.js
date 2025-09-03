module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		name: String,
		description: String,
		url: { type: String, sparse: true, trim: true, unique: true },
		data: {},
	});

	Schema.methods.create = function (obj) {
		this.name = obj.name;

		this.description = obj.description;

		this.data = obj.data;

		this.url = obj.url;
	};
	return (waw.Bird = waw.mongoose.model("Bird", Schema));
};
