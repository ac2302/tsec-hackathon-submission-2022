const router = require("express").Router();
const User = require("../models/User");
const authOnlyMiddleware = require("../middlewares/authOnly");

router.get("/self", require("../middlewares/authOnly"), (req, res) => {
	res.json(req.user);
});

router.patch("/self", authOnlyMiddleware, async (req, res) => {
	const props = Object.getOwnPropertyNames(req.body);
	props.forEach((prop) => {
		req.user[prop] = req.body[prop];
	});
	res.json(await req.user.save());
});

router.get("/user/:username", authOnlyMiddleware, async (req, res) => {
	const users = await User.find({ username: req.params.username });

	if (screen.length === 1) {
		res.json(users[0]);
	} else {
		res.status(400).json({ msg: "invalid user" });
	}
});

module.exports = router;
