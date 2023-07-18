import bcrypt from 'bcrypt';
import { errorMessage } from '../common/constant/error';
import { IRegistrationData } from '../common/types/user';
import UserDto from '../dtos/UserDto';
import ApiError from '../exceptions/ApiError';
import User from '../models/all/UserModel';
import tokenService from './tokenService';

class UserService {
	async registration(data: IRegistrationData) {
		const { email, password } = data;
		const candidate = await User.findOne({ where: { email } });
		if (candidate) throw ApiError.badRequest(errorMessage.userExist);
		const hashPassword = await bcrypt.hash(password, 5);
		const newUser = await User.create({ ...data, password: hashPassword });
		const userDto = new UserDto(newUser);
		const tokens = await tokenService.generateAndSaveTokens({ ...userDto });
		return { ...tokens, user: newUser };
	}

	async login(email: string, password: string) {
		const user = await User.findOne({ where: { email } });
		if (!user) throw ApiError.badRequest(errorMessage.notFoundWithEmail);
		const isPassEquals = await bcrypt.compare(password, user.getDataValue('password'));
		if (!isPassEquals) throw ApiError.badRequest(errorMessage.wrongPassword);
		const userDto = new UserDto(user);
		const tokens = await tokenService.generateAndSaveTokens({ ...userDto });
		return { ...tokens, user };
	}

	async logout(refreshToken: string) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	async getUserById(id: string) {
		const user = await User.findOne({ where: { id } });
		return user;
	}
}

export default new UserService();
