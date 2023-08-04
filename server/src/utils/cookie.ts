import { Response } from 'express';

export const setRefreshToken = (res: Response, refreshToken: string) => {
	res.cookie('refreshToken', refreshToken, {
		maxAge: 30 * 24 * 3600 * 1000,
		httpOnly: true,
		// secure: true,
	});
};
