const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const studentsRouter = require("./routes/Students");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
const monngodbURI = process.env.MONGODB_URI;

mongoose
  .connect(monngodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.log("error in connecting to mongodb ", error));

app.use(cors());
app.use("/api", studentsRouter);

app.listen(5000, () => {
  console.log("Listening to port 5000");
});

//mongodb+srv://sujithkharvi:keekkeek@cluster0.lglbgpz.mongodb.net/?retryWrites=true&w=majority
