import { Router } from 'express';
import likeController from '../../controllers/likeController';

const likeRoute = Router({});
likeRoute.get('/', likeController.getItemLikes);
likeRoute.post('/', likeController.create);

export default likeRoute;
