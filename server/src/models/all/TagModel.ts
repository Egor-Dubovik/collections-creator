import { DataTypes } from 'sequelize';
import sequelize from '../../db';

export const Tag = sequelize.define('tag', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	value: { type: DataTypes.STRING },
});

export const ItemTag = sequelize.define('itemTag', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
