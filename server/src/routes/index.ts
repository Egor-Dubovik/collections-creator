import { Router } from 'express';
import collectionRouter from './apiRouters/collectionRouter';
import commentRoute from './apiRouters/commentRouter';
import itemRoute from './apiRouters/itemRouter';
import likeRoute from './apiRouters/likeRouter';
import tagRouter from './apiRouters/tagRouter';
import tokenRouter from './apiRouters/tokenRouter';
import topicRouter from './apiRouters/topicRouter';
import userRouter from './apiRouters/userRouter';

const router: Router = Router({});
router.use('/user', userRouter);
router.use('/collection', collectionRouter);
router.use('/item', itemRoute);
router.use('/comment', commentRoute);
router.use('/tag', tagRouter);
router.use('/like', likeRoute);
router.use('/token', tokenRouter);
router.use('/topic', topicRouter);

export default router;
