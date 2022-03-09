require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

mongoose.connect(process.env.DB_STRING, (err) => {
	if (!err) console.log("connected to db");
	else console.error(err);
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ exposedHeaders: "user" }));

app.use(require("./middlewares/auth"));

// listening
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`server live on port ${PORT}`));

// routes
app.use("/auth", require("./routes/auth"));
app.use("/profile", require("./routes/profile"));
app.use("/project", require("./routes/project"));
app.use("/chat", require("./routes/chat"));
app.use("/board", require("./routes/board"));
