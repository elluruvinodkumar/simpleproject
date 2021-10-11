const Joi = require('joi');

const options = { abortEarly: true };

const validateAddItemParametersSchema = Joi.object({
        emailId: Joi.string().email().required(),
        amount: Joi.string().required(),
        address: Joi.string().required(),
        //category: Joi.string().required(),
        products: Joi.array().empty()
        .allow(null, '')
        .optional(),
       
});

const validateAddItemParameters = (data) => {
  return validateAddItemParametersSchema.validate(data, options);
};

module.exports = {
    validateAddItemParameters,
}
