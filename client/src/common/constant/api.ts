export const BASE_URL = 'http://localhost:10000/';
export const API_URL = `${BASE_URL}cl-creator`;

export const API = {
	user: '/user',
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
	item: '/item',
	allItems: '/item/all',
	oneItem: '/item/one',
	collectionProps: '/collection/props',
	tag: '/tag',
	itemTag: '/tag/item',
	comment: '/comment',
	like: '/like',
};
