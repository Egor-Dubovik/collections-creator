import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import sequelize from './db';
import syncModels from './models/index';
import router from './routes/index';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/errorMiddleware';
import path from 'path';

dotenv.config();
const PORT = process.env.PORT || 6666;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'static', 'image')));
app.use('/cl-creator', router);
app.use(errorMiddleware);

const start = async () => {
	try {
		await sequelize.authenticate();
		syncModels();
		app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
	} catch (error) {
		console.log(error);
	}
};

start();
