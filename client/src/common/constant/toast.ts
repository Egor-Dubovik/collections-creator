interface IStatusProps {
	TITLE: {
		LOGIN: string;
		SIGN_UP: string;
	};
	DESCRIPT: {
		LOGIN: string;
		SIGN_UP: string;
	};
	STATUS: 'error' | 'success' | 'info' | 'warning' | 'loading' | undefined;
}

interface IToast {
	SUCCESS: IStatusProps;
	ERR: IStatusProps;
	DURATION: number;
	IS_CLOSABLE: boolean;
}

export const AUTH_TOAST: IToast = {
	SUCCESS: {
		TITLE: {
			SIGN_UP: 'Account created.',
			LOGIN: 'Successfully!',
		},
		DESCRIPT: {
			SIGN_UP: "We've created your account for you.",
			LOGIN: 'You are logged into your account.',
		},
		STATUS: 'success',
	},
	ERR: {
		TITLE: {
			SIGN_UP: 'Something went wrong.',
			LOGIN: 'Something went wrong.',
		},
		DESCRIPT: {
			SIGN_UP: "Your account wasn't created.",
			LOGIN: 'Failed to login to your account',
		},
		STATUS: 'error',
	},
	DURATION: 9000,
	IS_CLOSABLE: true,
};
