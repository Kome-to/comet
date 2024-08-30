import { Joi } from 'express-validation';

export default {
  getUser: {
    query: Joi.object({
      id: Joi.string().allow(null),
      email: Joi.string().email().allow(null),
    }),
  },
};
