import { Joi } from 'express-validation';

export default {
  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().max(200).required(),
    }),
  },
};
