import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { errorMessage } from '../common/constant/error';
import ApiError from '../exceptions/ApiError';
import userService from '../services/userService';
import { setRefreshToken } from '../utils/cookie';

class UserController {
	async registration(req: Request, res: Response, next: NextFunction) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return next(ApiError.badRequest(errorMessage.registration, errors.array()));
			const newUser = await userService.registration({ ...req.body, avatar: req.file?.filename });
			setRefreshToken(res, newUser.refreshToken);
			return res.json(newUser);
		} catch (err) {
			next(err);
		}
	}
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			const userData = await userService.login(email, password);
			setRefreshToken(res, userData.refreshToken);
			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}
}

export default new UserController();
