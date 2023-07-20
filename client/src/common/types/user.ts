export type TypeUserStatus = 'active' | 'blocked';
export type TypeUserRole = 'user' | 'admin';

export interface IUpdateStatusData {
	userId: number;
	status: TypeUserStatus;
}
export interface IUpdateRoleData {
	userId: number;
	role: TypeUserRole[];
}

export interface IRegisterProps {
	nickName?: string;
	email: string;
	password: string;
	avatar?: string;
	role?: string[];
}

export interface ILoginParams {
	email: string;
	password: string;
}

export interface IUser extends IRegisterProps {
	id: number;
	status: TypeUserStatus;
}

export interface IAuthResponse {
	accessToken: string;
	refreshToken: string;
	user: IUser;
}

export interface IToken {
	id: number;
	userId: number;
	refreshToken: string;
}
