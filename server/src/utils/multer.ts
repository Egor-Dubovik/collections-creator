import { Request } from 'express';
import multer from 'multer';
import path from 'path';
import * as uuid from 'uuid';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const filename = path.resolve();
const dirname = path.dirname(filename);

const fileStorage = multer.diskStorage({
	destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
		cb(null, path.resolve(dirname, 'server', 'src', 'static', 'image'));
	},
	filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
		const fileName = uuid.v4() + '.jpg';
		cb(null, fileName);
	},
});

const fileUpload = multer({ storage: fileStorage });

export default fileUpload;
