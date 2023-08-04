import { Router } from 'express';
import topicController from '../../controllers/topicController';

const topicRouter = Router({});

topicRouter.get('/', topicController.getAll);
topicRouter.get('/one', topicController.getOneById);

export default topicRouter;
