import jwt from 'jsonwebtoken';
import { Model } from 'sequelize';
import { IUser } from '../common/types/user';
import UserDto from '../dtos/UserDto';
import ApiError from '../exceptions/ApiError';
import Token from '../models/all/TokenModel';
import User from '../models/all/UserModel';

class TokenService {
	async generateAndSaveTokens(user: IUser) {
		const tokens = this.generateTokens({ ...user });
		await this.saveToken(user.id, tokens.refreshToken);
		return tokens;
	}

	generateTokens(payload: any) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, { expiresIn: '15d' });
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, { expiresIn: '30d' });
		return { accessToken, refreshToken };
	}

	async saveToken(userId: number, refreshToken: string) {
		const tokenData = await Token.findOne({ where: { userId } });
		if (tokenData) {
			tokenData.setDataValue('refreshToken', refreshToken);
			return tokenData.save();
		}
		const token = await Token.create({ userId, refreshToken });
		return token;
	}

	async removeToken(refreshToken: string) {
		const tokenData = await Token.destroy({ where: { refreshToken } });
		return tokenData;
	}

	validateAccessToken(token: string) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_KEY);
			return userData;
		} catch (e) {
			return null;
		}
	}

	validateRefreshToken(token: string) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY);
			return userData;
		} catch (e) {
			return null;
		}
	}

	async findToken(refreshToken: string) {
		const tokenData = await Token.findOne({ where: { refreshToken } });
		return tokenData;
	}

	async refresh(refreshToken: string) {
		if (!refreshToken) throw ApiError.unauthorizedError();
		const userData = this.validateRefreshToken(refreshToken);
		const tokenFromDb = await this.findToken(refreshToken);
		if (!userData || !tokenFromDb) throw ApiError.unauthorizedError();
		const user = (await User.findOne({ where: { id: userData.id } })) as Model<IUser>;
		const userDto = new UserDto(user);
		const tokens = this.generateTokens({ ...userDto });
		await this.saveToken(userDto.id, tokens.refreshToken);
		return { ...tokens, user };
	}
}

export default new TokenService();
