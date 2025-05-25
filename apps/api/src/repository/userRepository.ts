import { type UpdateUserData, type UserData } from '@repo/entities/user';
import {
  addDocument,
  deleteDocument,
  getCollectionData,
  updateDocument,
} from '../helpers/databases/firebase';

const collection = 'users';

const listUserData = async () => {
  try {
    const result = await getCollectionData<UserData>(collection);
    return result;
  } catch (error) {
    throw error;
  }
};

const addUserData = async (data: UpdateUserData) => {
  try {
    const result = await addDocument(collection, data);
    return result;
  } catch (error) {
    throw error;
  }
};

const updateUserData = async (userId: string, data: UpdateUserData) => {
  try {
    const result = await updateDocument(collection, userId, data);
    return result;
  } catch (error) {
    throw error;
  }
};

const updateUserToken = async (userId: string, data: { userToken: string }) => {
  try {
    const result = await updateDocument(collection, userId, data);
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteUserData = async (userId: string) => {
  try {
    const result = await deleteDocument(collection, userId);
    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  listUserData,
  addUserData,
  updateUserData,
  updateUserToken,
  deleteUserData,
};
