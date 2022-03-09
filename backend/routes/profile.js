const router = require("express").Router();
const User = require("../models/User");
const authOnlyMiddleware = require("../middlewares/authonly");

router.get("/self", require("../middlewares/authonly"), (req, res) => {
	res.json(req.auth);
});

router.get("/user/:username", authOnlyMiddleware, async (req, res) => {
	const users = await User.findOne({ username: req.params.username });

	if (screen.length === 1) {
		res.json(users[0]);
	} else {
		res.status(400).json({ msg: "invalid user" });
	}
});

router.post("/self/password", authOnlyMiddleware, async (req, res) => {
	req.user.password = req.body.updated;
	req.user.save();
});

router.post("/self/github", authOnlyMiddleware, async (req, res) => {
	req.user.github = req.body.updated;
	req.user.save();
});

router.post("/self/website", authOnlyMiddleware, async (req, res) => {
	req.user.website = req.body.updated;
	req.user.save();
});

router.post("/self/domains", authOnlyMiddleware, async (req, res) => {
	req.user.domains = req.body.updated;
	req.user.save();
});

router.post("/self/tools", authOnlyMiddleware, async (req, res) => {
	req.user.tools = req.body.updated;
	req.user.save();
});

router.post("/self/languages", authOnlyMiddleware, async (req, res) => {
	req.user.languages = req.body.updated;
	req.user.save();
});

router.post("/self/avatar", authOnlyMiddleware, async (req, res) => {
	req.user.avatar = req.body.updated;
	req.user.save();
});

module.exports = router;
