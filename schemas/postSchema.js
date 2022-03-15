const Joi = require('joi');

module.exports = Joi.object({
  title: Joi.string().min(2).required().messages({
    'any.required': '400|"title" is required',
    'string.base': '400|"title" must be a string',
    'string.min': '400|"title" length must be at least 2 characters long',
  }),
  content: Joi.string()
  .required()
  .messages({
    'any.required': '400|"content" is required',
    'string.base': '400|"content" must be a string',
    'string.email': '400|"content" must be a valid email',
  }),
  categoryIds: Joi.array().required().items(Joi.number()).messages({
    'string.base': '400|"image" must be a string',
    'any.required': '400|"categoryIds" is required',
  }),
});