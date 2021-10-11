const Joi = require('joi');

const options = { abortEarly: true };

const validateAddItemParametersSchema = Joi.object({
        emailId: Joi.string().email().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        //category: Joi.string().required(),
        category: Joi.array().empty()
        .allow(null, '')
        .optional(),
        price: Joi.string().required(),
        pics: Joi.array().empty()
        .allow(null, '')
        .optional(),
});

const validateFetchAllItemsParamsSchema = Joi.object({
  emailId: Joi.string().email().required().messages({
    'string.email': `Invalid Email`,
    'string.base': `Email must be a type of string`,
    'string.empty': `Email is required`,
    'any.required': `Email is required`,
    'any.optional': `Email is optional`,
  })
});

const validateFetchAllItemsParams = (data) => {
  return validateFetchAllItemsParamsSchema.validate(data, options);
};

const validateAddItemParameters = (data) => {
  return validateAddItemParametersSchema.validate(data, options);
};

module.exports = {
  validateFetchAllItemsParams,
    validateAddItemParameters,
}
