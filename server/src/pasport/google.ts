import passport from 'passport';
import GooglePassport from 'passport-google-oauth20';
import { errorMessage } from '../common/constant/error';

const GoogleStrategy = GooglePassport.Strategy;

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId || !googleSecret) {
	throw new Error(errorMessage.notAllExternalVariables);
}

passport.use(
	new GoogleStrategy(
		{
			clientID: googleClientId,
			clientSecret: googleSecret,
			callbackURL: 'http://www.example.com/auth/google/callback',
		},
		function (accessToken, refreshToken, profile, done) {
			// User.findOrCreate({ googleId: profile.id }, function (err, user) {
			// 	return cb(err, user);
			// });
			return done(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
