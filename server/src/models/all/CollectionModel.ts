import { DataTypes, Model } from 'sequelize';
import { ICollectionData, ICollectionProp } from '../../common/types/collection';
import sequelize from '../../db';

export const Collection = sequelize.define<Model<ICollectionData>>('collection', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING },
	description: { type: DataTypes.TEXT },
	userId: { type: DataTypes.INTEGER },
	topicId: { type: DataTypes.INTEGER, allowNull: true },
});

export const CollectionProp = sequelize.define<Model<ICollectionProp>>('collectionProp', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	type: { type: DataTypes.STRING },
});

export const ItemCollectionProp = sequelize.define('itemCollectionProp', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
