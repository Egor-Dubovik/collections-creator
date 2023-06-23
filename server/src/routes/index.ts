import { Router } from 'express';
import collectionRouter from './apiRouters/collectionRoute';
import userRouter from './apiRouters/userRoute';

const router: Router = Router({});
router.use('/user', userRouter);
router.use('/collection', collectionRouter);

export default router;
