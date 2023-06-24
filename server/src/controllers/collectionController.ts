import { NextFunction, Request, Response } from 'express';
import { errorMessage } from '../common/constant/error';
import ApiError from '../exceptions/ApiError';
import collectionPropService from '../services/collectionPropService';
import collectionService from '../services/collectionService';

class CollectionController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const { title, description, topic, props, userId } = req.body;
			if (!title || !description || !topic || !userId || !props.length)
				return next(ApiError.badRequest(errorMessage.notAllFields));
			const userData = await collectionService.create({ title, topic, description, userId }, props);
			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async createProp(req: Request, res: Response, next: NextFunction) {
		try {
			const { prop, collectionId } = req.body;
			if (!prop || !collectionId) return next(ApiError.badRequest(errorMessage.notAllFields));
			const newProp = await collectionPropService.createOneProp(prop, collectionId);
			return res.json(newProp);
		} catch (err) {
			next(err);
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const collections = await collectionService.getAll();
			return res.json(collections);
		} catch (err) {
			next(err);
		}
	}

	async getAllByUserId(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.query;
			if (!id) return next(ApiError.badRequest(errorMessage.notAllFields));
			const collections = await collectionService.getAllByUserId(Number(id));
			return res.json(collections);
		} catch (err) {
			next(err);
		}
	}
}

export default new CollectionController();
