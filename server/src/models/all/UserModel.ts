import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	nickName: { type: DataTypes.STRING },
	email: { type: DataTypes.STRING(500), unique: true },
	password: { type: DataTypes.STRING },
	avatar: { type: DataTypes.STRING(500) },
	role: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: ['user'] },
});

export default User;
