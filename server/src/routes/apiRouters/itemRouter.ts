import { Router } from 'express';
import itemController from '../../controllers/itemController';
import authMiddleware from '../../middleware/authMiddleware';
import fileUpload from '../../utils/multer';

const itemRoute = Router({});

itemRoute.get('/', authMiddleware, itemController.getByParams);
itemRoute.get('/recent', itemController.getRecentItems);
itemRoute.post('/', fileUpload.single('image'), itemController.create);
itemRoute.post('/prop', itemController.createProp);

export default itemRoute;
