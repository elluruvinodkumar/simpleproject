const Joi = require('joi');

const options = { abortEarly: true };

const validateAddReviewParametersSchema = Joi.object({
    itemId: Joi.string().required(),
    itemReview: Joi.string().required(),
    reviewedBy: Joi.string().required(),
    ratings: Joi.string().required()       
});

const validateAddReviewParameters = (data) => {
  return validateAddReviewParametersSchema.validate(data, options);
};

const validateFetchReviewParamsSchema = Joi.object({
  itemId: Joi.string().required()
});

const validateFetchReviewParams = (data) => {
  console.log("parms..",data)
  return validateFetchReviewParamsSchema.validate(data, options);
};

module.exports = {
    validateAddReviewParameters,
    validateFetchReviewParams
}
