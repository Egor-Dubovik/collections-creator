import { Router } from 'express';
import collectionRouter from './apiRouters/collectionRoute';
import itemRoute from './apiRouters/itemRoute';
import userRouter from './apiRouters/userRoute';

const router: Router = Router({});
router.use('/user', userRouter);
router.use('/collection', collectionRouter);
router.use('/item', itemRoute);

export default router;
