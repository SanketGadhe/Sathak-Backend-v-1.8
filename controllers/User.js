const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");
const ErrorResponse=require('../utils/errorHandler')

const register = async (req, res, next) => {
  console.log("USER Request",req.url)
  console.log("Inside register controller");
  console.log("Request body:", req.body);
  const { name, email, password } = req.body;
console.log("Request at register",req.body)

  // Validate request body
  if (!name  || !email || !password) {
    return next(new ErrorResponse("All fields are required", 400));
  }

  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return next(new ErrorResponse("User already exists", 400));
    }
    // Password encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: { id: createdUser._id, email: createdUser.email },
    });
  } catch (err) {
    return next(new ErrorResponse(err.message, 500));
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate request body
console.log("Request at Logiin",req.body)

  if (!email || !password) {
    return next(new ErrorResponse("Email and password are required", 401));
  }
  try {
    const isUser = await User.findOne({ email });
    if (!isUser) {
      return next(new ErrorResponse("Invalid email or password", 401));
    }
    const ismatch = await isUser.matchPassword(password);
    if (!ismatch) {
      return res
      .status(200)
      .json({ success: false, message: "Invalid email or password"});
  
    }
    const token = generateToken(isUser._id);
    
    return res.cookie("userToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
  .status(200)
      .json({ success: true, message: "Login successful", token, user:{_id:isUser._id,name:isUser.name,email:isUser.email,userlearning:isUser.courseEnrolled,profileimg:isUser.profileImage} });
  } catch (err) {
    return next(new ErrorResponse(err.message, 500));
  }
};
const logout = (req, res) => {
  res.clearCookie("userToken");

  return res.status(200).json({ success: true, message: "Logout successful" });
};
const showLearning = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId).populate('courseEnrolled');
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    console.log("User",user)
    return res.status(200).json({ success: true, courses: user.courseEnrolled });
  } catch (err) {
    return next(new ErrorResponse(err.message, 500));
  }
}
const course= require('../models/CoursesModel')
const addToLearning = async (req, res, next) => {
  const { courseId ,userId} = req.body;
 const result=await User.updateOne({_id:userId},{$push:{courseEnrolled:courseId}})
const availedcourse=await course.updateOne({_id:courseId},{$push:{availedby:userId}})
 console.log(result)
 if (result) {
  return res.status(200).json({ success: true, message: "Course added to learning list" });
} else {
  return next(new ErrorResponse("Failed to add course to learning list", 500));
}
}
const profileUpdate=async (req, res) => {
  const { userId, name, email} = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    

    // Update profile image if a new file is uploaded
    if (req.file) {
      user.profileImage = `/userimage/${req.file.filename}`;
    }

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", profileImage: user.profileImage });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
}
const deletecourse=async (req, res) => {
  const { courseId ,userId} = req.body;
 const result=await User.updateOne({_id:userId},{$pull:{courseEnrolled:courseId}})
const availedcourse=await course.updateOne({_id:courseId},{$pull:{availedby:userId}})
  console.log(result)
  if (result) {
    return res.status(200).json({ success: true, message: "Course removed from learning list" });
  } else {
    return next(new ErrorResponse("Failed to remove course from learning list", 500));
  }
  }
module.exports = { register, login, logout,addToLearning,showLearning,profileUpdate,deletecourse };
