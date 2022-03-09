const mongoose = require("mongoose");

const repoSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	url: {
		type: String,
	},
	description: {
		type: String,
	},
});

const bugSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	description: {
		type: String,
	},
	status: {
		type: String,
		default: "open",
	},
});

const checklistItemSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

const checklistSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	description: {
		type: String,
	},
	items: {
		type: [checklistItemSchema],
		default: [],
	},
});

module.exports = mongoose.model(
	"Project",
	new mongoose.Schema({
		name: {
			type: String,
		},
		owner: {
			type: String,
		},
		description: {
			type: String,
		},
		meetingLink: {
			type: String,
		},
		admins: {
			type: [String],
			default: [],
		},
		members: {
			type: [String],
			default: [],
		},
		isPublic: {
			type: Boolean,
			default: true,
		},
		isAcceptingApplications: {
			type: Boolean,
			default: false,
		},
		applicants: {
			type: [String],
			default: [],
		},
		upi: {
			type: String,
		},
		domains: {
			type: [String],
			default: [],
		},
		technologies: {
			type: [String],
			default: [],
		},
		repos: {
			type: [repoSchema],
			default: [],
		},
		bugs: {
			type: [bugSchema],
			default: [],
		},
	})
);
