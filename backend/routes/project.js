const router = require("express").Router();
const User = require("../models/User");
const Project = require("../models/Project");
const authOnlyMiddleware = require("../middlewares/authOnly");

router.post("/:projectName", authOnlyMiddleware, async (req, res) => {
	try {
		// checking if project exists
		const projects = await Project.find({ name: req.params.projectName });
		if (projects.length > 0)
			return res.status(400).json({ msg: "project name is taken" });

		const project = new Project({
			name: req.params.projectName,
			owner: req.user.username,
			description: req.body.description,
		});

		res.json(project.save);
	} catch (err) {
		res.status(400).json({ msg: "invalid request", err });
	}
});

router.patch("/:projectName", authOnlyMiddleware, async (req, res) => {
	try {
		const props = Object.getOwnPropertyNames(req.body);
		const project = Project.findOne({ name: req.params.projectName });

		props.forEach((prop) => {
			project[prop] = req.body[prop];
		});
		res.json(await project.save());
	} catch (err) {
		res.status(400).json({ msg: "invalid request", err });
	}
});

router.get("/:projectName", authOnlyMiddleware, async (req, res) => {
	const projects = await Project.find({ name: req.params.projectName });

	if (screen.length === 1) {
		res.json(projects[0]);
	} else {
		res.status(400).json({ msg: "invalid project" });
	}
});

module.exports = router;
