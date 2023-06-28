import { Router } from 'express';
import likeController from '../../controllers/likeController';
import authMiddleware from '../../middleware/authMiddleware';

const likeRoute = Router({});
likeRoute.get('/', likeController.getItemLikes);
likeRoute.post('/', authMiddleware, likeController.create);

export default likeRoute;
