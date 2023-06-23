import { Router } from 'express';
import { body } from 'express-validator';
import passport from 'passport';
import userController from '../../controllers/userController';
import fileUpload from '../../utils/multer';

const userRouter = Router({});

userRouter.post(
	'/registration',
	fileUpload.single('avatar'),
	body('email').isEmail(),
	body('password').isLength({ min: 4, max: 18 }),
	body('nickName').isLength({ min: 3 }),
	userController.registration
);

userRouter.post('/login', userController.login);
userRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

export default userRouter;
