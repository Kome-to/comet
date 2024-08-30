import { Joi } from 'express-validation';

export default {
  create: {
    body: Joi.object({
      name: Joi.string().max(50).required(),

      members: Joi.array().items(Joi.string().email()),
      channel: Joi.object({
        name: Joi.string().max(50).required(),
        publicKey: Joi.string(),
        ePrivateKey: Joi.string(),
      }).allow(null),
    }),
  },
};
