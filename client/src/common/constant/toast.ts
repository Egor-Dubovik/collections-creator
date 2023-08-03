interface IStatusProps {
	TITLE: {
		SIGN_UP: string;
		LOGIN: string;
		LOGOUT: string;
	};
	DESCRIPT: {
		LOGIN: string;
		SIGN_UP: string;
		LOGOUT: string;
	};
	STATUS: 'error' | 'success' | 'info' | 'warning' | 'loading' | undefined;
}

interface IToast {
	SUCCESS: IStatusProps;
	ERR: IStatusProps;
	DURATION: number;
	IS_CLOSABLE: boolean;
}

const WRONG = 'Something went wrong.';

export const AUTH_TOAST: IToast = {
	SUCCESS: {
		TITLE: {
			SIGN_UP: 'Account created.',
			LOGIN: 'Successfully!',
			LOGOUT: 'Successfully!',
		},
		DESCRIPT: {
			SIGN_UP: "We've created your account for you.",
			LOGIN: 'You are logged into your account.',
			LOGOUT: 'You are logged out of your account, now your actions are limited',
		},
		STATUS: 'success',
	},
	ERR: {
		TITLE: {
			SIGN_UP: WRONG,
			LOGIN: WRONG,
			LOGOUT: WRONG,
		},
		DESCRIPT: {
			SIGN_UP: "Your account wasn't created.",
			LOGIN: 'Failed to login to your account',
			LOGOUT: 'Failed to log out',
		},
		STATUS: 'error',
	},
	DURATION: 5000,
	IS_CLOSABLE: true,
};
