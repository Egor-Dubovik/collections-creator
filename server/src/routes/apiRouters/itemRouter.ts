import { Router } from 'express';
import itemController from '../../controllers/itemController';
import authMiddleware from '../../middleware/authMiddleware';
import fileUpload from '../../utils/multer';

const itemRoute = Router({});

itemRoute.get('/', itemController.getByParams);
itemRoute.get('/all', itemController.getAll);
itemRoute.get('/one', itemController.getOne);
itemRoute.get('/recent', itemController.getRecentItems);
itemRoute.post('/', authMiddleware, fileUpload.single('image'), itemController.create);
itemRoute.post('/prop', authMiddleware, itemController.createProp);

export default itemRoute;
