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

		res.user.projects.push(req.params.projectName);
		await res.user.save();

		res.json(await project.save());
	} catch (err) {
		res.status(400).json({ msg: "invalid request", err });
	}
});

router.post("/:projectName/apply", authOnlyMiddleware, async (req, res) => {
	try {
		// checking if project exists
		const projects = await Project.find({ name: req.params.projectName });
		if (projects.length == 0)
			return res.status(400).json({ msg: "project does not exist" });

		projects[0].applicants.push(req.user.username);
		await projects[0].save();

		res.json({ msg: "succesfully applied" });
	} catch (err) {
		res.status(400).json({ msg: "invalid request", err });
	}
});

router.post(
	"/:projectName/accept/:username",
	authOnlyMiddleware,
	async (req, res) => {
		try {
			// checking if project exists
			const projects = await Project.find({ name: req.params.projectName });
			if (projects.length == 0)
				return res.status(400).json({ msg: "project does not exist" });

			if (!projects[0].applicants.includes(req.params.username))
				return res.status(400).json({ msg: "user not in applicants" });

			projects[0].applicants = projects[0].applicants.filter(
				(e) => e != req.params.username
			);
			projects[0].members.push(req.params.username);

			res.json(await projects[0].save());
		} catch (err) {
			res.status(400).json({ msg: "invalid request", err });
		}
	}
);

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

	if (projects.length === 1) {
		res.json(projects[0]);
	} else {
		res.status(400).json({ msg: "invalid project" });
	}
});

module.exports = router;
