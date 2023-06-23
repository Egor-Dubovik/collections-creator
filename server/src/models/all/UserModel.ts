import { DataTypes } from 'sequelize';
import sequelize from '../../db';

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	nickName: { type: DataTypes.STRING },
	email: { type: DataTypes.STRING(500), unique: true },
	password: { type: DataTypes.STRING, allowNull: true },
	avatar: { type: DataTypes.STRING(500), allowNull: true },
	role: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: ['user'] },
	googleId: { type: DataTypes.STRING(500), allowNull: true },
});

export default User;
