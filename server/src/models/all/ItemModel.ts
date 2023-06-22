import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';
import Collection from './CollectionModel.js';

export const Item = sequelize.define('item', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

export const ItemCollectionProp = sequelize.define('itemCollectionProp', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	value: { type: DataTypes.STRING },
	type: { type: DataTypes.STRING },
});

Collection.belongsToMany(Item, { through: ItemCollectionProp });
Item.belongsToMany(Collection, { through: ItemCollectionProp });
