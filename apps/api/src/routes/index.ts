import { Router } from 'express';
import { NotFoundError } from '../helpers/utils/error';
import wrapper from '../helpers/utils/wrapper';
import userRoutes from './userRoutes';

const router = Router();

router.use('/api', userRoutes);

router.get('/', (req, res, next) => {
  console.log('yes');
  wrapper.response(res, 200, {
    message: 'api services is running properly',
    code: 200,
    data: null,
    success: true,
  });
});

router.use((req, res, next) => {
  return wrapper.responseError(res, new NotFoundError('resource not found from api services'));
});

export default router;
