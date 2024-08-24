import { Joi } from 'express-validation';

export default {
  signUp: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().max(200).required(),
      firstName: Joi.string().max(50).required(),
      lastName: Joi.string().max(50).required(),
      publicKey: Joi.string().required(),
      ePrivateKey: Joi.string().required(),
    }),
  },

  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().max(200).required(),
    }),
  },
};
