export interface IRegistrationData {
	nickName: string;
	email: string;
	password: string;
	avatar?: string;
	role?: string[];
	// googleId?: string;
}

export interface IUser extends IRegistrationData {
	id: number;
}
