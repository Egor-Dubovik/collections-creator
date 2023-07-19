import { NextFunction, Request, Response } from 'express';
import { errorMessage } from '../common/constant/error';
import ApiError from '../exceptions/ApiError';
import collectionPropService from '../services/collectionPropService';
import collectionService from '../services/collectionService';

class CollectionController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const { title, description, topicId, userId, props } = req.body;
			if (!title || !description || !topicId || !userId || !props.length)
				return next(ApiError.badRequest(errorMessage.notAllFields));
			const userData = await collectionService.create(
				{ title, topicId, description, userId, image: req.file?.filename },
				JSON.parse(props)
			);
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

	async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.query;
			const collection = await collectionService.getOne(id as string);
			return res.json(collection);
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

	async getProps(req: Request, res: Response, next: NextFunction) {
		try {
			const { collectionId } = req.query;
			const props = await collectionPropService.getItemCollectionProps(Number(collectionId));
			return res.json(props);
		} catch (err) {
			next(err);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.query;
			if (!id) return next(ApiError.badRequest(errorMessage.notAllFields));
			const isDeleted = await collectionService.delete(Number(id));
			return res.json({ isDeleted });
		} catch (err) {
			next(err);
		}
	}
}

export default new CollectionController();
