interface IStatusProps {
	TITLE: string;
	DESCRIPT: string;
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
		TITLE: 'Account created.',
		DESCRIPT: "We've created your account for you.",
		STATUS: 'success',
	},
	ERR: {
		TITLE: 'Something went wrong.',
		DESCRIPT: "Your account wasn't created.",
		STATUS: 'error',
	},
	DURATION: 9000,
	IS_CLOSABLE: true,
};
