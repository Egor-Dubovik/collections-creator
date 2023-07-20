import fs from 'fs';
import passport from 'passport';
import { Profile, Strategy as GoogleStrategy } from 'passport-google-oauth20';
import path from 'path';
import { errorMessage } from '../common/constant/error';
import ApiError from '../exceptions/ApiError';
import User from '../models/all/UserModel';

const filename = path.resolve();
const dirname = path.dirname(filename);

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId || !googleSecret) {
	throw new Error(errorMessage.notAllExternalVariables);
}

// Стратегия Google для аутентификации через Google
passport.use(
	new GoogleStrategy(
		{
			clientID: googleClientId,
			clientSecret: googleSecret,
			callbackURL: 'http://www.example.com/auth/google/callback',
		},
		async (accessToken, refreshToken, profile: Profile, done) => {
			try {
				// Поиск пользователя по googleId или email
				let user = await User.findOne({ where: { googleId: profile.id } });
				const nickName = profile.name?.givenName as string;
				// let avatarPath;

				// if (profile.photos?.length) {
				// 	const photoPath = path.resolve(dirname, 'server', 'src', 'static', 'image');
				// 	fs.renameSync(profile.photos[0].value, photoPath);
				// }

				if (!user) {
					const email =
						profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
					if (!email) throw ApiError.badRequest('err');

					user = await User.findOne({ where: { email } });
					// Если пользователь с таким email не найден, создайте нового пользователя
					if (!user) {
						user = await User.create({ googleId: profile.id, email, nickName });
					} else {
						// Если пользователь с таким email найден, свяжите его с googleId
						user.setDataValue('googleId', profile.id);
						await user.save();
					}
				}

				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser(async (id: string, done) => {
	try {
		const user = await User.findByPk(id);
		return done(null, user);
	} catch (error) {
		return done(error);
	}
});

export default passport;

// userRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// userRouter.get(
// 	'/auth/google/callback',
// 	passport.authenticate('google', { failureRedirect: '/login' }),
// 	function (req, res) {
// 		// Successful authentication, redirect home.
// 		res.redirect('/');
// 	}
// );
