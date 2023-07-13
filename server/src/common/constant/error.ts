export const errorMessage = {
	notAllFields: 'Not all fields passed',
	notAuthorized: 'User not authorized',
	registration: 'Validation error check email, password, nickName and avatar',
	notAllDBVariables: 'Failed to get all environment variables to connect to database',
	notAllExternalVariables: 'Failed to get all environment variables to connect to external service',
	unexpected: 'Unexpected error',
	userExist: 'The user with the given email exists',
	notFoundWithEmail: "User with this email wasn't found",
	wrongPassword: 'Wrong password',
	propExist: 'Such property already exists in your collection',
	itemPropExist: 'the item already has a field with the same name',
	tagExist:
		'You are trying to pass tags that already exist in your item!Remove or replace them and try again',
	invalidToken:
		'Invalid token, most likely you are trying to log out of an account to which you do not have access',
	noCollection: 'The collection with the given id does not exist',
};
