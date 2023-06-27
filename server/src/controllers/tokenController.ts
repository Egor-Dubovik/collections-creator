import { NextFunction, Request, Response } from 'express';
import tokenService from '../services/tokenService';
import { setRefreshToken } from '../utils/cookie';

class TokenController {
	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await tokenService.refresh(refreshToken);
			setRefreshToken(res, userData.refreshToken);
			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}
}

export default new TokenController();
