import { Router } from 'express';
import userHandler from '../handler/userHandler';
import { basicAuth, verifyToken } from '../middleware/authMiddleware';
import { validateSchema } from '../middleware/validateMiddleware';
import { createSchema, deleteSchema, updateSchema } from '../schemas/userSchema';

const router = Router();

router.get('/fetch-user-data', basicAuth, userHandler.listUser);

router.post('/create-user-data', basicAuth, validateSchema(createSchema), userHandler.createUser);

router.patch(
  '/update-user-data',
  verifyToken,
  validateSchema(updateSchema),
  userHandler.updateUser,
);

router.delete(
  '/remove-user-data/:id',
  basicAuth,
  validateSchema(deleteSchema),
  userHandler.deleteUser,
);

export default router;
