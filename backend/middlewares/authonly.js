function authOnly(req, res, next) {
	if (req.auth.user == null)
		return res
			.status(401)
			.json({ msg: "you must be logged in to access this" });

	next();
}

module.exports = authOnly;
