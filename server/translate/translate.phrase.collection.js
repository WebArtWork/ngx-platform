module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		name: String,
	});

	Schema.methods.create = function (obj, user, waw) {
		this.name = obj.name;
	};

	return (waw.Translatephrase = waw.mongoose.model(
		"Translatephrase",
		Schema
	));
};
