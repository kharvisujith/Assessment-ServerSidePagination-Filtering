const express = require("express");
const {
  fetchStudentsDetails,
  postStudentsDetails,
} = require("../controllers/StudentsContoller");

const studentsRouter = express.Router();

studentsRouter.get("/students", fetchStudentsDetails);

studentsRouter.post("/students", postStudentsDetails);

module.exports = studentsRouter;
