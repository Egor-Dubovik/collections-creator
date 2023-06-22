import { Model } from 'sequelize';
import Collection from './all/CollectionModel';
import Comment from './all/CommentModel';
import { Item, ItemCollectionProp } from './all/ItemModel';
import Like from './all/LikeModule';
import { ItemTag, Tag } from './all/TagModel';

import User from './all/UserModel';

interface Models {
	[key: string]: typeof Model;
}

const models: Models = { User, Collection, Item, ItemCollectionProp, Tag, ItemTag, Comment, Like };

Collection.belongsToMany(Item, { through: ItemCollectionProp });
Item.belongsToMany(Collection, { through: ItemCollectionProp });

Item.belongsToMany(Tag, { through: ItemTag });
Tag.belongsToMany(Item, { through: ItemTag });

Item.hasMany(Comment);
Comment.belongsTo(Item);
User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(Like);
Like.belongsTo(User);
Item.hasMany(Like);
Like.belongsTo(Item);

const syncModels = async (): Promise<void> => {
	for (const model of Object.values(models)) {
		await model.sync({ alter: true });
	}
};

export default syncModels;
