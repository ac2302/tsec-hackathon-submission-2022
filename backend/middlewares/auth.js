const req = require("express/lib/request");
const User = require("../models/User");

async function authMiddleware(req, res, next) {
	try {
		req.user = await User.findOne({ username: req.headers.user });
		console.log("user logged in");
	} catch (err) {
		req.user = null;
		console.log("user not logged in");
	}

	next();
}

module.exports = authMiddleware;
