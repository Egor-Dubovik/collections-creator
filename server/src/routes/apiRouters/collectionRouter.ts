import { Router } from 'express';
import collectionController from '../../controllers/collectionController';

const collectionRouter = Router({});

collectionRouter.get('/', collectionController.getAll);
collectionRouter.get('/user', collectionController.getAllByUserId);
collectionRouter.post('/', collectionController.create);
collectionRouter.post('/prop', collectionController.createProp);

export default collectionRouter;
