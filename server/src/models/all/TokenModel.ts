import { DataTypes } from 'sequelize';
import sequelize from '../../db';

const Token = sequelize.define('token', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	refreshToken: { type: DataTypes.STRING(1000) },
});

export default Token;
