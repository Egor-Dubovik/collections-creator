import { NextFunction, Request, Response } from 'express';
import { errorMessage } from '../common/constant/error';
import ApiError from '../exceptions/ApiError';

// export const errorMiddleware = (err: Error, req: Request, res: Response) => {
// 	return err instanceof ApiError
// 		? res.status(err.status).json({ message: err.message, errors: err.errors })
// 		: res.status(500).json({ message: errorMessage.unexpected });
// };

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
	console.log(err);
	if (err instanceof ApiError) {
		return res.status(err.status).json({ message: err.message, errors: err.errors });
	}
	return res.status(500).json({ message: 'Непредвиденная ошибка' });
};
