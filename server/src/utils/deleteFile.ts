import fs from 'fs';
import path from 'path';

export const deleteFile = (name: string) => {
	const filePath = path.resolve(__dirname, '..', 'static', 'image', name);
	fs.unlink(filePath, err => {
		if (err) new Error(err.message);
	});
};
