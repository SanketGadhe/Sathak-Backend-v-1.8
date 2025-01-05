const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/userimage/"); // Save files in public/userimage
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const uploadprofile = multer({ storage });
  module.exports = uploadprofile;