const Joi = require('joi');

const options = { abortEarly: true };

const validateFileUploadParamsSchema = Joi.object({
  emailId: Joi.string().email().required().messages({
    'string.email': `Invalid Email`,
    'string.base': `Email must be a type of string`,
    'string.empty': `Email is required`,
    'any.required': `Email is required`,
    'any.optional': `Email is optional`,
  })
});

const validateFileUploadParams = (data) => {
    return validateFileUploadParamsSchema.validate(data, options);
  };

module.exports = {
    validateFileUploadParams
  }