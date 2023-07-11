const Joi = require("@hapi/joi");

const authSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required(),
  phoneNumber: Joi.string().min(10).max(10).required(),
  bloodGroup: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
});

const authLogin = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required(),
});

const authEditDetails = Joi.object({
  userId: Joi.string(),
  fullName: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  phoneNumber: Joi.string().min(10).max(10).required(),
  bloodGroup: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
});

module.exports = {
  authSchema,
  authLogin,
  authEditDetails,
};
