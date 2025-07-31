module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		name: String,
		language: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "Translatelanguage",
		},
		phrase: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "Translatephrase",
		},
	});

	Schema.methods.create = function (obj) {
		this.name = obj.name;

		this.language = obj.language;

		this.phrase = obj.phrase;
	};

	return (waw.Translate = waw.mongoose.model("Translate", Schema));
};
