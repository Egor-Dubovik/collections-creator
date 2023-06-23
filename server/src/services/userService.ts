import bcrypt from 'bcrypt';
import { errorMessage } from '../common/constant/error';
import { IRegistrationData } from '../common/types/user';
import ApiError from '../exceptions/ApiError';
import User from '../models/all/UserModel';

class UserService {
	async registration(data: IRegistrationData) {
		const { email, password } = data;
		const candidate = await User.findOne({ where: { email } });
		if (candidate) throw ApiError.badRequest(errorMessage.userExist);
		const hashPassword = await bcrypt.hash(password, 5);
		const newUser = await User.create({ ...data, password: hashPassword });
		return newUser;
	}

	async login(email: string, password: string) {
		const user = await User.findOne({ where: { email } });
		if (!user) throw ApiError.badRequest(errorMessage.notFoundWithEmail);
		const isPassEquals = await bcrypt.compare(password, user.getDataValue('password'));
		if (!isPassEquals) throw ApiError.badRequest(errorMessage.wrongPassword);
		return user;
	}
}

export default new UserService();
