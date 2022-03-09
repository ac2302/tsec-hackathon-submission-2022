const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
	sender: {
		type: String,
	},
	media: {
		type: String,
	},
	text: {
		type: String,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model(
	"Board",
	new mongoose.Schema({
		project: {
			type: String,
		},
		messages: {
			type: [messageSchema],
			default: [],
		},
	})
);
