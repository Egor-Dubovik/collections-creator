import { Router } from 'express';
import commentController from '../../controllers/commentController';
import authMiddleware from '../../middleware/authMiddleware';

const commentRoute = Router({});

commentRoute.get('/', commentController.getAll);
commentRoute.post('/', authMiddleware, commentController.create);
commentRoute.put('/', authMiddleware, commentController.update);

export default commentRoute;
