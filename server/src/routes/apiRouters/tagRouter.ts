import { Router } from 'express';
import tagController from '../../controllers/tagController';

const tagRouter = Router({});

tagRouter.get('/', tagController.getAll);
tagRouter.get('/item', tagController.getAllByItemId);
tagRouter.post('/', tagController.create);

export default tagRouter;
