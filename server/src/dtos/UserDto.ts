import { Model } from 'sequelize';
import { IUser } from '../common/types/user';

class UserDto implements IUser {
	id: number;
	nickName: string;
	email: string;
	password: string;
	role?: string[];
	avatar?: string;

	constructor(model: Model<IUser>) {
		this.id = model.getDataValue('id');
		this.nickName = model.getDataValue('nickName');
		this.email = model.getDataValue('email');
		this.password = model.getDataValue('password');
		this.role = model.getDataValue('role');
		this.avatar = model.getDataValue('avatar');
	}
}

export default UserDto;
