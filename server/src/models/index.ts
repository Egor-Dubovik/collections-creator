import { Collection, CollectionProp, ItemCollectionProp } from './all/CollectionModel';
import { Item, ItemProp } from './all/ItemModel';
import { ItemTag, Tag } from './all/TagModel';
import { Topic, topicArray } from './all/TopicModel';
import Comment from './all/CommentModel';
import Like from './all/LikeModule';
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
	Topic,
};

Collection.belongsToMany(CollectionProp, { through: ItemCollectionProp });
CollectionProp.belongsToMany(Collection, { through: ItemCollectionProp });
Collection.hasMany(Item);
Item.belongsTo(Collection);

Collection.hasOne(Topic);
Topic.belongsTo(Collection);

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
	try {
		for (const model of Object.values(models)) await model.sync({ alter: true });
		await Topic.sync({ force: true });
		const topics = topicArray.map(topic => ({ en: topic.en, ru: topic.ru }));
		await Topic.bulkCreate(topics);
	} catch (error) {
		console.error('Error syncing models:', error);
	}
};

export default syncModels;
