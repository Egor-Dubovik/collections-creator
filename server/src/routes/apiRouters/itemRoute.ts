import { Router } from 'express';
import itemController from '../../controllers/itemController';

const itemRoute = Router({});

itemRoute.get('/', itemController.getByParams);
itemRoute.get('/recent', itemController.getRecentItems);
itemRoute.get('/user', itemController.getRecentItems);
itemRoute.post('/', itemController.create);
itemRoute.post('/prop', itemController.createProp);

export default itemRoute;
