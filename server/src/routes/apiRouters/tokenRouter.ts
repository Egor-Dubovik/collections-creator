import { Router } from 'express';
import tokenController from '../../controllers/tokenController';

const tokenRouter = Router({});
tokenRouter.get('/refresh', tokenController.refresh);

export default tokenRouter;
