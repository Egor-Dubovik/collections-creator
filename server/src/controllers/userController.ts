import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { errorMessage } from '../common/constant/error';
import ApiError from '../exceptions/ApiError';

class UserController {
	async registration(req: Request, res: Response, next: NextFunction) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.badRequest(errorMessage.validation, errors.array()));
			}
			// userSercice.registration()
		} catch (err) {
			next(err);
		}
	}
}

export default new UserController();
