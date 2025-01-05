const express = require("express");
const {createCourse,getCourse, getoneCourse} = require("../controllers/Course");
const router = express.Router();
const upload = require("../config/multerFile");
const { addToLearning } = require("../controllers/User");
router.post(
    "/createcourses",
    upload.fields([{ name: "videos", maxCount: 20 }, { name: "thumbnail", maxCount: 1 }]),
    createCourse
  );
  router.get("/getcourses",getCourse)
router.get("/getonecourse/:courseName",getoneCourse
)

module.exports = router;