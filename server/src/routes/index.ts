import { Router } from 'express';
import userRouter from './apiRouters/userRoute';

const router: Router = Router({});
router.use('/user', userRouter);

export default router;
