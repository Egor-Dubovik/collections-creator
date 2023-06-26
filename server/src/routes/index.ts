import { Router } from 'express';
import collectionRouter from './apiRouters/collectionRoute';
import commentRoute from './apiRouters/commentRoute';
import itemRoute from './apiRouters/itemRoute';
import likeRoute from './apiRouters/likeRoute';
import tagRouter from './apiRouters/tagRouter';
import userRouter from './apiRouters/userRoute';

const router: Router = Router({});
router.use('/user', userRouter);
router.use('/collection', collectionRouter);
router.use('/item', itemRoute);
router.use('/comment', commentRoute);
router.use('/tag', tagRouter);
router.use('/like', likeRoute);

export default router;
