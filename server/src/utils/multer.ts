import { Request } from 'express';
import multer from 'multer';
import path from 'path';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const filename = path.resolve();
const dirname = path.dirname(filename);

const fileStorage = multer.diskStorage({
	destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
		cb(null, path.resolve(dirname, 'static', 'image'));
	},
	filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
		cb(null, file.originalname);
	},
});

const fileUpload = multer({ storage: fileStorage });

export default fileUpload;
