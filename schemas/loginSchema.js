const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string().min(1)
  .required().email()
  .messages({
    'string.min': '400|"email" is not allowed to be empty',
    'any.required': '400|"email" is required',
    'string.base': '400|"email" must be a string',
    'string.email': '400|"email" must be a valid email',
  }),
  password: Joi.string().min(1).required().messages({
    'string.min': '400|"password" is not allowed to be empty',
    'any.required': '400|"password" is required',
    'string.base': '400|"password" must be a string',
  }),
});