import { type TokenData } from '@repo/entities/base';
import { type UpdateUserData } from '@repo/entities/user';

export interface UpdatePayload {
  tokenData: TokenData;
  body: UpdateUserData;
}
