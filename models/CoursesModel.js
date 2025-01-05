const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  courseName: { type: String, required: true },
  courseThumbnail: { type: String, required: true ,default:"default.jpeg" },
  courseCategory: { type: String, required: true },
  courseDescription: { type: String, required: true },
  courseRating: { type: Number ,default:0},
  noofPeopleAvailed: { type: Number ,default:0},
  noofVideo: { type: Number,default:0 },
  duration: { type: String,default:"Not Defined" },
  availedby:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
  courseVideos: [
    {
      title: String,
      url: String,
      duration: String,
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);
