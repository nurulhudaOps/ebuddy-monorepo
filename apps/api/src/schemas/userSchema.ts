import Joi from 'joi';

export const createSchema = {
  body: Joi.object({
    name: Joi.string().min(1).max(100).required(),
    email: Joi.string().email().required(),
    totalAverageWeightRatings: Joi.number().min(0).max(5).required(),
    numberOfRents: Joi.number().min(0).required(),
  }),
};

export const updateSchema = {
  body: Joi.object({
    name: Joi.string().min(1).max(100).required(),
    email: Joi.string().email().required(),
    totalAverageWeightRatings: Joi.number().min(0).max(5).required(),
    numberOfRents: Joi.number().min(0).required(),
  }),
};

export const deleteSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};
