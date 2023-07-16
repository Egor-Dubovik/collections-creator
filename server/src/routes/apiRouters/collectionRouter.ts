import { Router } from 'express';
import collectionController from '../../controllers/collectionController';
import authMiddleware from '../../middleware/authMiddleware';
import fileUpload from '../../utils/multer';

const collectionRouter = Router({});

collectionRouter.get('/', collectionController.getAll);
collectionRouter.get('/props', collectionController.getProps);
collectionRouter.get('/user', collectionController.getAllByUserId);
collectionRouter.post('/', authMiddleware, fileUpload.single('image'), collectionController.create);
collectionRouter.post('/prop', authMiddleware, collectionController.createProp);
collectionRouter.delete('/', authMiddleware, collectionController.delete);

export default collectionRouter;
