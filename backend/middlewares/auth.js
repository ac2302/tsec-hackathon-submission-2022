const req = require("express/lib/request");
const User = require("../models/User");

async function authMiddleware(rq, res, next) {
	try {
		req.user = await User.findOne({ username: req.headers.user });
	} catch (err) {
		req.user = null;
	}
}

module.exports = authMiddleware;
