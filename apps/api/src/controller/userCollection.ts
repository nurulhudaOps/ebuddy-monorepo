import { UpdateUserData } from '@repo/entities/user';
import { type UpdatePayload } from '../entities/user';
import { InternalServerError } from '../helpers/utils/error';
import wrapper from '../helpers/utils/wrapper';
import { generateToken } from '../middleware/authMiddleware';
import userRepository from '../repository/userRepository';

const listUserData = async () => {
  try {
    const getData = await userRepository.listUserData();
    return wrapper.data(getData);
  } catch (error) {
    return wrapper.error(new InternalServerError(error as string));
  }
};

const createUserData = async (payload: UpdateUserData) => {
  try {
    // create data
    const createData = await userRepository.addUserData(payload);

    // update userToken
    const userToken = generateToken({
      userId: createData as string,
      name: payload.name,
      generatedAt: new Date().getTime(),
    });
    await userRepository.updateUserToken(createData as string, { userToken });

    return wrapper.data(createData);
  } catch (error) {
    return wrapper.error(new InternalServerError(error as string));
  }
};

const updateUserData = async (payload: UpdatePayload) => {
  try {
    const { body, tokenData } = payload;
    const updateData = await userRepository.updateUserData(tokenData.userId, body);
    return wrapper.data({
      id: tokenData.userId,
      updatedAt: updateData,
    });
  } catch (error) {
    return wrapper.error(new InternalServerError(error as string));
  }
};

const deleteUserData = async (userId: string) => {
  try {
    const removeData = await userRepository.deleteUserData(userId);
    return wrapper.data({
      id: userId,
      deletedAt: removeData,
    });
  } catch (error) {
    return wrapper.error(new InternalServerError(error as string));
  }
};

export default {
  listUserData,
  createUserData,
  updateUserData,
  deleteUserData,
};
