import { Router } from 'express';
import { body } from 'express-validator';
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
userRouter.post('/logout', userController.logout);
userRouter.get('/one', userController.getUser);
userRouter.get('/search', userController.getSearchUsers);
userRouter.patch('/status', userController.updateStatus);
userRouter.patch('/role', userController.updateRole);

export default userRouter;
