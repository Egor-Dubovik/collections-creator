import { Collection, CollectionProp, ItemCollectionProp } from './all/CollectionModel';
import Comment from './all/CommentModel';
import { Item, ItemProp } from './all/ItemModel';
import Like from './all/LikeModule';
import { ItemTag, Tag } from './all/TagModel';
import Token from './all/TokenModel';

import User from './all/UserModel';

const models = {
	User,
	Token,
	Collection,
	CollectionProp,
	ItemCollectionProp,
	Item,
	ItemProp,
	Tag,
	ItemTag,
	Comment,
	Like,
};

Collection.belongsToMany(CollectionProp, { through: ItemCollectionProp });
CollectionProp.belongsToMany(Collection, { through: ItemCollectionProp });
Collection.hasMany(Item);
Item.belongsTo(Collection);

User.hasMany(Collection);
Collection.belongsTo(User);
User.hasOne(Token);
Token.belongsTo(User);

Item.hasMany(ItemProp);
ItemProp.belongsTo(Item);

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
