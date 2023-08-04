import { DataTypes } from 'sequelize';
import sequelize from '../../db';

export const Item = sequelize.define('item', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	image: { type: DataTypes.STRING, allowNull: true },
});

export const ItemProp = sequelize.define('itemProp', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	value: { type: DataTypes.STRING },
	type: { type: DataTypes.STRING },
});
