import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { UnprocessableEntityError } from '../helpers/utils/error';
import wrapper from '../helpers/utils/wrapper';

declare module 'express-serve-static-core' {
  interface Request {
    validate?: any;
  }
}

interface SchemaValidations {
  body?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
}

const validationModel = (schema: Joi.ObjectSchema, payload: any) => {
  const { error, value } = schema.validate(payload, { abortEarly: false });
  if (error) {
    const err = error.details.map((item) => {
      const field = item.path[item.path.length - 1];
      return {
        message: item.message.replace(/"/g, ''),
        field,
      };
    });

    return { err, value: null };
  }

  return { err: null, value };
};

export const validateSchema = (schema: SchemaValidations) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { body, query, params } = schema;
    const error = [];
    let data = {};

    if (query) {
      const { err, value } = validationModel(query, req.query);
      if (err) {
        error.push(...err);
      } else {
        data = { ...data, ...value };
      }
    }

    if (params) {
      const { err, value } = validationModel(params, req.params);
      if (err) {
        error.push(...err);
      } else {
        data = { ...data, ...value };
      }
    }

    if (body) {
      const { err, value } = validationModel(body, req.body);
      if (err) {
        error.push(...err);
      } else {
        data = { ...data, ...value };
      }
    }

    if (error.length > 0) {
      return wrapper.responseError(res, new UnprocessableEntityError('Validation error', error));
    }

    req.validate = data;
    next();
  };
};
