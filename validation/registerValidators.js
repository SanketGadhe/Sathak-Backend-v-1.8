const { body } = require('express-validator');

const registerValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .custom((value, { req }) => {
      console.log("Validating 'name':", value);
      return true; // Always pass for debugging
    }),

  body('email')
    .isEmail()
    .withMessage('Invalid email format')
    .custom((value, { req }) => {
      console.log("Validating 'email':", value);
      return true; // Always pass for debugging
    }),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .custom((value, { req }) => {
      console.log("Validating 'password':", value);
      return true; // Always pass for debugging
    }),
];

module.exports = registerValidation;
