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

		req.user.projects.push(req.params.projectName);
		await req.user.save();

		res.json(await project.save());
	} catch (err) {
		console.error(err);
		res.status(400).json({ msg: "invalid request", err });
	}
});

router.post("/:projectName/apply", authOnlyMiddleware, async (req, res) => {
	try {
		// checking if project exists
		const projects = await Project.find({ name: req.params.projectName });
		if (projects.length == 0)
			return res.status(400).json({ msg: "project does not exist" });

		if (projects[0].applicants.includes(req.user.username))
			return res.status(400).json({ msg: "you have already applied" });

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

router.post(
	"/:projectName/promote/:username",
	authOnlyMiddleware,
	async (req, res) => {
		try {
			// checking if project exists
			const projects = await Project.find({ name: req.params.projectName });
			if (projects.length == 0)
				return res.status(400).json({ msg: "project does not exist" });

			if (!projects[0].members.includes(req.params.username))
				return res.status(400).json({ msg: "user not in members" });

			projects[0].members = projects[0].members.filter(
				(e) => e != req.params.username
			);
			projects[0].admins.push(req.params.username);

			res.json(await projects[0].save());
		} catch (err) {
			res.status(400).json({ msg: "invalid request", err });
		}
	}
);

router.post(
	"/:projectName/demote/:username",
	authOnlyMiddleware,
	async (req, res) => {
		try {
			// checking if project exists
			const projects = await Project.find({ name: req.params.projectName });
			if (projects.length == 0)
				return res.status(400).json({ msg: "project does not exist" });

			if (!projects[0].admins.includes(req.params.username))
				return res.status(400).json({ msg: "user not in admins" });

			projects[0].admins = projects[0].admins.filter(
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
		const project = await Project.findOne({ name: req.params.projectName });

		props.forEach((prop) => {
			project[prop] = req.body[prop];
		});
		console.log({ project });
		res.json(await project.save());
	} catch (err) {
		console.log(err);
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
