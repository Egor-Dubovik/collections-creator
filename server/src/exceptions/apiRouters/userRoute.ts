import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../../controllers/userController';

const userRouter = Router({});

userRouter.post(
	'/registration',
	body('email').isEmail(),
	body('password').isLength({ min: 4, max: 18 }),
	userController.registration
);

export default userRouter;
