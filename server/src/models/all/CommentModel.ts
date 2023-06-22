import { DataTypes } from 'sequelize';
import sequelize from '../../db';

const Comment = sequelize.define('comment', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	value: { type: DataTypes.TEXT },
});

export default Comment;
