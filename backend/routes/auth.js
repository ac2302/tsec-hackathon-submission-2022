const router = require("express").Router();
const User = require("../models/User");

router.get("/self", require("../middlewares/authOnly"), (req, res) => {
	res.json(req.auth);
});

router.post("/register", async (req, res) => {
	const { username, password, email } = req.body;

	if (!username || !password || !email)
		return res.status(400).json({ msg: "missing username, password or email" });

	// checking if username exists
	const users = await User.find({ username: username });
	if (users.length > 0)
		return res.status(400).json({ msg: "username is taken" });

	// add user
	const newUser = new User({ username, password, email });
	return res.json(await newUser.save());
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password)
		return res.status(400).json({ msg: "missing username or pasword" });

	// checking if username exists
	const users = await User.find({ username: username });
	if (users.length === 0)
		return res.status(400).json({ msg: "username is incorrect" });

	const user = users[0];

	if (user.password !== password)
		return res.status(400).json({ msg: "password is incorrect" });

	// sending token
	res.send("logged in");
});

module.exports = router;
