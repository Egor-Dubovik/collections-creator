import { DataTypes, Model } from 'sequelize';
import { ITag } from '../../common/types/tag';
import sequelize from '../../db';

export const Tag = sequelize.define<Model<ITag>>('tag', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	value: { type: DataTypes.STRING },
});

export const ItemTag = sequelize.define('itemTag', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
