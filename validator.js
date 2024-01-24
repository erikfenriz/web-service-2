const {body, validationResult} = require('express-validator')

const isCapitalizedCustomCheck = (value) => {
  if (value[0] !== value[0].toUpperCase()) {
    throw new Error('The string must start with a capital letter');
  }
  return true;
}

const isBirthdayCustomCheck = (value) => {
  const dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
  if (!dateRegex.test(value)) {
    throw new Error('Invalid date format');
  }
  return true;
}
const userValidationRules = () => {
  return [
    body('firstName').notEmpty().withMessage('Field is required').bail().isString().bail().custom(isCapitalizedCustomCheck),
    body('lastName').notEmpty().withMessage('Field is required').bail().isString().bail().custom(isCapitalizedCustomCheck),
    body('email').notEmpty().withMessage('Field is required').bail().isString().bail().isEmail().withMessage('Invalid email address'),
    body('username').notEmpty().withMessage('Field is required').bail().isString().bail().isLength({min: 3}).withMessage('Username must be at least 3 characters long'),
    body('password').notEmpty().withMessage('Field is required').bail().isString().bail().isLength({min: 5}).withMessage('Password must be at least 5 characters long'),
    body('birthDate').notEmpty().withMessage('Field is required').bail().isString().bail().custom(isBirthdayCustomCheck),
    body('address').notEmpty().withMessage('Field is required').bail().isString(),
  ]
}

const bookValidationRules = () => {
  return [
    body('title').notEmpty().withMessage('Field is required').bail().isString(),
    body('author').notEmpty().withMessage('Field is required').bail().isString().bail().custom(isCapitalizedCustomCheck),
    body('genre').notEmpty().withMessage('Field is required').bail().isString(),
    body('publicationYear').notEmpty().withMessage('Field is required').bail().isNumeric().bail().isInt().bail().isLength({min: 1, max: 4}),
    body('isbn').notEmpty().withMessage('Field is required').bail().isString().bail().isISBN(),
    body('availableCopies').notEmpty().withMessage('Field is required').bail().isNumeric().bail().isInt(),
    body('publisher').notEmpty().withMessage('Field is required').bail().isString(),
    body('language').notEmpty().withMessage('Field is required').bail().isString(),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  return res.status(422).json({
    errors: errors.array().map(err => ({[err.path]: err.msg}))
  })
}

module.exports = {
  userValidationRules,
  bookValidationRules,
  validate,
}
