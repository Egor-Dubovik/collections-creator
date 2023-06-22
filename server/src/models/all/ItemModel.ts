import { DataTypes } from 'sequelize';
import sequelize from '../../db';

export const Item = sequelize.define('item', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

export const ItemCollectionProp = sequelize.define('itemCollectionProp', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	value: { type: DataTypes.STRING },
	type: { type: DataTypes.STRING },
});
