const { validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  console.log("Handling validation errors...");
  console.log("Request body:", req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("Validation failed. Errors:", errors.array());

    const formattedErrors = errors.array().map((err) => ({
      field: err.param,
      message: err.msg,
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: formattedErrors,
    });
  }

  console.log("Validation passed.");
  next();
};

module.exports = handleValidationErrors;
