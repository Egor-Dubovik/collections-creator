import { DataTypes } from 'sequelize';
import sequelize from '../../db';

const Collection = sequelize.define('collection', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING },
	description: { type: DataTypes.TEXT },
	topic: { type: DataTypes.STRING },
});

export default Collection;
