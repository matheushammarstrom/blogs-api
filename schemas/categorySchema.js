const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().min(1).required().messages({
    'string.min': '400|"name" is not allowed to be empty',
    'any.required': '400|"name" is required',
    'string.base': '400|"name" must be a string',
  }),
});
