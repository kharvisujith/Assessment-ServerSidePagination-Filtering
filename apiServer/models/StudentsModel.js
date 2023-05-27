const mongoose = require("mongoose");

const studentsDetialsSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    requird: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const StudentsDetails = mongoose.model(
  "StudentsDetails",
  studentsDetialsSchema
);

module.exports = StudentsDetails;
