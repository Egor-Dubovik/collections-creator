import { Router } from 'express';
import itemController from '../../controllers/itemController';

const itemRoute = Router({});

itemRoute.post('/', itemController.create);
itemRoute.post('/prop', itemController.createProp);

export default itemRoute;
