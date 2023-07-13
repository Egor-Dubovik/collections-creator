import { Router } from 'express';
import collectionController from '../../controllers/collectionController';
import fileUpload from '../../utils/multer';

const collectionRouter = Router({});

collectionRouter.get('/', collectionController.getAll);
collectionRouter.get('/user', collectionController.getAllByUserId);
collectionRouter.post('/', fileUpload.single('image'), collectionController.create);
collectionRouter.post('/prop', collectionController.createProp);
collectionRouter.delete('/', collectionController.delete);

export default collectionRouter;
