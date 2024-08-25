import { Joi } from 'express-validation';

export default {
  create: {
    body: Joi.object({
      name: Joi.string().max(50).required(),
    }),
  },
};
