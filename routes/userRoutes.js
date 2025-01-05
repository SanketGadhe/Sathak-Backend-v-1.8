const express = require("express");
const {
  register,
  login,
  logout,
  addToLearning,
  showLearning,
  profileUpdate,
  deletecourse,
} = require("../controllers/User");

const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const handleValidationErrors = require("../middlewares/handelValidationError");

const registerValidation = require("../validation/registerValidators");


const uploadprofile = require("../config/profileuploadmulter");
router.use((req, res, next) => {
  console.log("Request received in userRoutes:");
  console.log("URL:", req.url);
  console.log("Method:", req.method);
  next(); // Pass the request to the next middleware/route
});

router.post("/addcourse", addToLearning);
router.route("/register").post(
  (req, res, next) => {
    console.log("Matched /register route in userRoutes");
    next(); // Pass to the next middleware/controller
  },
  registerValidation,
  handleValidationErrors,
  register
);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/showcourse").post(showLearning);
router
  .route("/profileupdate")
  .post(uploadprofile.single("profileImage"), profileUpdate);

router.route("/deletecourse").post(deletecourse);






module.exports = router;
