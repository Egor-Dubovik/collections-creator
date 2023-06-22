import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import sequelize from './db';
// import fileUpload from 'express-fileupload';
// import sequelize from './db';
import { errorMiddleware } from './midleware/errorMiddleware';
import router from './routes/index';
import fileUpload from './utils/multer';

dotenv.config();
const corsOptions = {
	origin: process.env.CLIENT_URL,
	credentials: true,
};

const PORT = process.env.PORT || 6666;
const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.resolve(dirname, 'static', 'image')));
// app.use(fileUpload({}));
app.use(fileUpload.single('file'));
app.use('/cl-creator', router);

app.use(errorMiddleware);

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync({ alter: true });
		app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
	} catch (error) {
		console.log(error);
	}
};

start();
