require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");
const res = require("express/lib/response");

const app = express();

// enable files upload
app.use(
	fileUpload({
		createParentPath: true,
	})
);

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//start app
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is listening on port ${port}.`));

app.post("/upload", async (req, res) => {
	try {
		if (!req.files) {
			res.send({
				status: false,
				message: "No file uploaded",
			});
		} else {
			//Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
			let uploadedFile = req.files.file;

			const randomString =
				(Math.random() + 1).toString(36).substring(7) +
				(Math.random() + 1).toString(36).substring(7) +
				(Math.random() + 1).toString(36).substring(7) +
				(Math.random() + 1).toString(36).substring(7) +
				(Math.random() + 1).toString(36).substring(7);

			//Use the mv() method to place the file in upload directory (i.e. "uploads")
			uploadedFile.mv(`./uploads/${randomString}-${uploadedFile.name}`);

			//send response
			res.send({
				status: true,
				message: "File is uploaded",
				data: {
					name: `${randomString}-${uploadedFile.name}`,
					mimetype: uploadedFile.mimetype,
					size: uploadedFile.size,
				},
			});
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

app.get("/download/:filename", (req, res) => {
	try {
		res.sendFile(__dirname + "/uploads/" + req.params.filename);
	} catch (err) {
		res.status(500).send(err);
	}
});
