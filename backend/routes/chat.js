const router = require("express").Router();
const User = require("../models/User");
const Project = require("../models/Project");
const Chat = require("../models/Chat");
const authOnlyMiddleware = require("../middlewares/authOnly");

router.post("/:projectName", authOnlyMiddleware, async (req, res) => {
	try {
		// checking if chat exists
		const chats = await Chat.find({ project: req.params.projectName });
		if (chats.length != 0)
			return res.status(400).json({ msg: "chat already exists" });

		const chat = new Chat({ project: req.params.projectName });

		res.json(await chat.save());
	} catch (err) {
		res.status(400).json({ msg: "invalid request", err });
	}
});

router.post("/:projectName/message", authOnlyMiddleware, async (req, res) => {
	try {
		// checking if chat exists
		const chats = await Chat.find({ project: req.params.projectName });
		if (chats.length == 0)
			return res.status(400).json({ msg: "chat does not exist" });

		chats[0].messages.push({
			sender: req.user.username,
			media: req.body.media,
			text: req.body.text,
		});

		res.json(await chats[0].save());
	} catch (err) {
		res.status(400).json({ msg: "invalid request", err });
	}
});

router.get("/:projectName", authOnlyMiddleware, async (req, res) => {
	const chats = await Chat.find({ project: req.params.projectName });

	if (chats.length > 0) {
		res.json(chats[0]);
	} else {
		res.status(400).json({ msg: "invalid project" });
	}
});

module.exports = router;
