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

	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			if (!refreshToken) ApiError.badRequest(errorMessage.invalidToken);
			const token = await userService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json(token);
		} catch (err) {
			next(err);
		}
	}

	async getUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.query;
			if (!id) ApiError.badRequest(errorMessage.notAllFields);
			const user = await userService.getUserById(id as string);
			return res.json(user);
		} catch (err) {
			next(err);
		}
	}

	async getSearchUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const { query } = req.query;
			const users = await userService.getSearchUsers(query as string);
			return res.json(users);
		} catch (err) {
			next(err);
		}
	}

	async updateStatus(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId, status } = req.body;
			if (!userId || !status) ApiError.badRequest(errorMessage.notAllFields);
			const user = await userService.updateStatus(userId, status);
			return res.json(user);
		} catch (err) {
			next(err);
		}
	}

	async updateRole(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId, role } = req.body;
			if (!userId || !role) ApiError.badRequest(errorMessage.notAllFields);
			const user = await userService.updateRole(userId, JSON.parse(role));
			return res.json(user);
		} catch (err) {
			next(err);
		}
	}
}

export default new UserController();
