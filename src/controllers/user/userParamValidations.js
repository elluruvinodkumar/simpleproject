const Joi = require('joi');

const options = { abortEarly: true };

const validateLoginParamsSchema = Joi.object({
  emailId: Joi.string().email().required().messages({
    'string.email': `Invalid Email`,
    'string.base': `Email must be a type of string`,
    'string.empty': `Email is required`,
    'any.required': `Email is required`,
    'any.optional': `Email is optional`,
  }),
   password: Joi.string().required().messages({
    'string.base': `password must be a type of string`,
    'string.empty': `password is required`,
    'any.required': `password is required`,
    'any.optional': `password is optional`,
  }),
});

const validateUserDetailsParamsSchema = Joi.object({
  emailId : Joi.string().email().required().messages({
    'string.email': `Invalid Email`,
    'string.base': `Email must be a type of string`,
    'string.empty': `Email is required`,
    'any.required': `Email is required`,
    'any.optional': `Email is optional`,
  }),
  userType: Joi.string().required().messages({
    'string.base': `User Type must be a type of string`,
    'string.empty': `User Type is required`,
    'any.required': `User Type is required`,
    'any.optional': `User Type is optional`,
  }),
  firstName : Joi.string().required().messages({
    'string.base': `first name must be a type of string`,
    'string.empty': `first name is required`,
    'any.required': `first name is required`,
    'any.optional': `first name is optional`,
  }),
  lastName : Joi.string().required().messages({
    'string.base': `last name must be a type of string`,
    'string.empty': `last name is required`,
    'any.required': `last name is required`,
    'any.optional': `last name is optional`,
  }),
  password : Joi.string().required().messages({
    'string.base': `password must be a type of string`,
    'string.empty': `password is required`,
    'any.required': `password is required`,
    'any.optional': `password is optional`,
  }),
  address: Joi.string().required().messages({
    'string.base': `address must be a type of string`,
    'string.empty': `address is required`,
    'any.required': `address is required`,
    'any.optional': `address is optional`,
  }),
  phoneNumber: Joi.string().required().messages({
    'string.base': `Phone Number must be a type of string`,
    'string.empty': `Phone Number is required`,
    'any.required': `Phone Number is required`,
    'any.optional': `Phone Number is optional`,
  }),
});

const validateVerifyParamsSchema = Joi.object({
  emailId: Joi.string().email().required().messages({
    'string.email': `Invalid Email`,
    'string.base': `Email must be a type of string`,
    'string.empty': `Email is required`,
    'any.required': `Email is required`,
    'any.optional': `Email is optional`,
  }),
   otp: Joi.string().required().messages({
    'string.base': `Otp must be a type of string`,
    'string.empty': `Otp is required`,
    'any.required': `Otp is required`,
    'any.optional': `Otp is optional`,
  }),              
});

const validateUserDetailsParams = (data) => {
  return validateUserDetailsParamsSchema.validate(data, options);
};

const validateVerifyParams = (data) => {
  return validateVerifyParamsSchema.validate(data, options);
};

const validateLoginParams = (data) => {
  return validateLoginParamsSchema.validate(data, options);
};

module.exports = {
  validateLoginParams,
  validateVerifyParams,
  validateUserDetailsParams,
}
