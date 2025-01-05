const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

// Set storage engine
const  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/coursevideo/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

// Initialize upload
const upload = multer({ storage: storage });

module.exports = upload;