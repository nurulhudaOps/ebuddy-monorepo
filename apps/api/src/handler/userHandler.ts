import { type UpdateUserData } from '@repo/entities/user';
import { RequestHandler } from 'express';
import userController from '../controller/userCollection';
import { UpdatePayload } from '../entities/user';
import wrapper from '../helpers/utils/wrapper';

const listUser: RequestHandler = async (req, res) => {
  const { data, err } = await userController.listUserData();
  if (err) {
    const error = typeof err === 'string' ? { message: err } : err;
    return wrapper.responseError(res, error);
  }

  wrapper.response(res, 200, {
    message: 'Success to get user data',
    data,
  });
};

const createUser: RequestHandler = async (req, res) => {
  const payload: UpdateUserData = req.validate;
  const { data, err } = await userController.createUserData(payload);
  if (err) {
    const error = typeof err === 'string' ? { message: err } : err;
    return wrapper.responseError(res, error);
  }

  wrapper.response(res, 201, {
    message: 'Success to create user data',
    data,
  });
};

const updateUser: RequestHandler = async (req, res) => {
  const payload: UpdatePayload = {
    body: req.validate,
    tokenData: req.user,
  };

  const { data, err } = await userController.updateUserData(payload);
  if (err) {
    const error = typeof err === 'string' ? { message: err } : err;
    return wrapper.responseError(res, error);
  }

  wrapper.response(res, 200, {
    message: 'Success to update user data',
    data,
  });
};

const deleteUser: RequestHandler = async (req, res) => {
  const payload = req.validate;
  const { data, err } = await userController.deleteUserData(payload.id);
  if (err) {
    const error = typeof err === 'string' ? { message: err } : err;
    return wrapper.responseError(res, error);
  }

  wrapper.response(res, 200, {
    message: 'Success to remove user data',
    data,
  });
};

export default {
  listUser,
  createUser,
  updateUser,
  deleteUser,
};
