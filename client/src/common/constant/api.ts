export const BASE_URL = 'https://collection-creater.onrender.com/';
// export const BASE_URL = 'http://localhost:10000/';
export const API_URL = `${BASE_URL}cl-creator`;

export const API = {
	user: '/user',
	userSearch: '/user/search',
	updateStatus: '/user/status',
	updateRole: '/user/role',
	registration: '/user/registration',
	login: '/user/login',
	logout: '/user/logout',
	profile: '/profile',
	refresh: '/token/refresh',
	topic: '/topic',
	oneTopic: '/topic/one',
	collection: '/collection',
	oneCollection: '/collection/one',
	userCollection: '/collection/user',
	collectionTop: '/collection/top',
	item: '/item',
	collectionItems: '/item/collection',
	itemByTags: '/item/byTags',
	recentItems: '/item/recent',
	allItems: '/item/all',
	oneItem: '/item/one',
	collectionProps: '/collection/props',
	tag: '/tag',
	itemTag: '/tag/item',
	comment: '/comment',
	like: '/like',
	searchItems: '/search/items',
};
