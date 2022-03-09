const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
	language: {
		type: String,
	},
	libraries: {
		type: [String],
		default: [],
	},
});

module.exports = mongoose.model(
	"User",
	new mongoose.Schema({
		username: {
			type: String,
		},
		email: {
			type: String,
		},
		website: {
			type: String,
		},
		password: {
			type: String,
		},
		created: {
			type: Date,
			default: Date.now,
		},
		avatar: {
			type: String,
		},
		resume: {
			type: String,
		},
		github: {
			type: String,
		},
		domains: {
			type: [String],
			default: [],
		},
		tools: {
			type: [String],
			default: [],
		},
		projects: {
			type: [String],
			default: [],
		},
		languages: {
			type: [languageSchema],
			default: [],
		},
	})
);
