import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { errorMessage } from './common/constant/error';

dotenv.config();
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbDialect = 'postgres';

if (!dbName || !dbUser || !dbPassword || !dbHost || !dbPort) {
	throw new Error(errorMessage.notAllVariables);
}

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
	dialect: dbDialect,
	host: dbHost,
	port: Number(dbPort),
	dialectOptions: {
		ssl: true,
	},
});

export default sequelize;
