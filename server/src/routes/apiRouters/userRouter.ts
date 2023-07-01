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

// userRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// userRouter.get(
// 	'/auth/google/callback',
// 	passport.authenticate('google', { failureRedirect: '/login' }),
// 	function (req, res) {
// 		// Successful authentication, redirect home.
// 		res.redirect('/');
// 	}
// );

export default userRouter;
