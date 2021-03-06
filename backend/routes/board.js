const router = require("express").Router();
const User = require("../models/User");
const Project = require("../models/Project");
const Board = require("../models/Board");
const authOnlyMiddleware = require("../middlewares/authOnly");

router.post("/:projectName", authOnlyMiddleware, async (req, res) => {
	try {
		// checking if board exists
		const boards = await Board.find({ name: req.params.projectName });
		if (boards.length > 0)
			return res.status(400).json({ msg: "board already exists" });

		const board = new Board({ project: req.params.projectName });

		res.json(await board.save());
	} catch (err) {
		console.log(err);
		res.status(400).json({ msg: "invalid request", err });
	}
});

router.post("/:projectName/message", authOnlyMiddleware, async (req, res) => {
	try {
		// checking if board exists
		const boards = await Board.find({ project: req.params.projectName });
		if (boards.length == 0)
			return res.status(400).json({ msg: "board does not exist" });

		boards[0].messages.push({
			sender: req.user.username,
			media: req.body.media,
			text: req.body.text,
		});

		res.json(await boards[0].save());
	} catch (err) {
		res.status(400).json({ msg: "invalid request", err });
	}
});

router.patch("/:projectName", authOnlyMiddleware, async (req, res) => {
	try {
		const props = Object.getOwnPropertyNames(req.body);
		const board = await Board.findOne({ project: req.params.projectName });

		props.forEach((prop) => {
			board[prop] = req.body[prop];
		});
		res.json(await board.save());
	} catch (err) {
		res.status(400).json({ msg: "invalid request", err });
	}
});

router.get("/:projectName", authOnlyMiddleware, async (req, res) => {
	const boards = await Board.find({ project: req.params.projectName });

	if (boards.length > 0) {
		res.json(boards[0]);
	} else {
		res.status(400).json({ msg: "invalid project" });
	}
});

module.exports = router;
