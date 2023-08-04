import { Router } from 'express';
import searchController from '../../controllers/searchController';

const searchRouter = Router({});
searchRouter.get('/items', searchController.findItems);

export default searchRouter;
