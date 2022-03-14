const Joi = require('joi');

module.exports = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'any.required': '400|"displayName" is required',
    'string.base': '400|"displayName" must be a string',
    'string.min': '400|"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string()
  .required().email()
  .messages({
    'any.required': '400|"email" is required',
    'string.base': '400|"email" must be a string',
    'string.email': '400|"email" must be a valid email',
  }),
  image: Joi.string().messages({
    'string.base': '400|"image" must be a string',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': '400|"password" is required',
    'string.base': '400|"password" must be a string',
    'string.min': '400|"password" length must be 6 characters long',
  }),
});