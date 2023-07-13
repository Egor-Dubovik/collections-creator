import { Request } from 'express';
import multer from 'multer';
import path from 'path';
import * as uuid from 'uuid';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const fileStorage = multer.diskStorage({
	destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
		if (file) cb(null, path.resolve(__dirname, '..', 'static', 'image'));
	},
	filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
		if (file) {
			const fileName = uuid.v4() + '.jpg';
			cb(null, fileName);
		}
	},
});

const fileUpload = multer({ storage: fileStorage });

export default fileUpload;
