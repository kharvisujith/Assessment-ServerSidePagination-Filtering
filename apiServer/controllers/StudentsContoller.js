const StudentsDetailsModel = require("../models/StudentsModel");

const fetchStudentsDetails = async (req, res, next) => {
  try {
    const { pageNumber = 0, limit = 10, ...fieldfilters } = req.query;
    let filters = {};

    Object.entries(fieldfilters).forEach(([key, value]) => {
      if (key === "totalMarks") {
        filters[key] = Number(value);
      } else {
        filters[key] = { $regex: new RegExp(value, "i") };
      }
    });

    const studentsDetails = await StudentsDetailsModel.find(filters)
      .sort({ studentId: 1 })
      .skip(pageNumber * limit)
      .limit(Number(limit));
    const totalCount = await StudentsDetailsModel.countDocuments(filters);

    const response = {
      metadata: {
        totalStudents: totalCount,
        currentPage: Number(pageNumber),
        studentsPerPage: Number(limit),
      },
      studentsDetails,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      Message: "Error in fetching Student Details",
      error: `${error}`,
    });
  }
};

const postStudentsDetails = async (req, res, next) => {
  try {
    const studentsDetails = req.body;
    const savedStudents = await StudentsDetailsModel.create(studentsDetails);
    res.status(201).json({
      message: "Student details added successfully",
      students: savedStudents,
    });
  } catch (error) {
    res
      .status(500)
      .json({ Message: "Error in adding Student details", error: `${error}` });
  }
};

module.exports = {
  fetchStudentsDetails,
  postStudentsDetails,
};
