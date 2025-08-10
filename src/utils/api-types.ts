import type { InternalAxiosRequestConfig } from 'axios';

import type { Token, User } from './prop-types-ts';

export type BaseResponse = {
	success: boolean;
	message?: string;
};

export type UserLoginResponse = Omit<
	BaseResponse &
		Token & {
			user: User;
		},
	'message'
>;

export type RefreshTokenResponse = Omit<BaseResponse & Token, 'message'>;
export type UserDataResponse = Omit<
	BaseResponse & {
		user: User;
	},
	'message'
>;

export type CustomAxiosRequestConfig = InternalAxiosRequestConfig & {
	isToken?: boolean;
};

export type RequestType = 'get' | 'post' | 'patch';

export type AuthService = {
	login(email: string, password: string): Promise<UserLoginResponse>;
	register(
		email: string,
		password: string,
		name: string
	): Promise<UserLoginResponse>;
	forgotPassword(email: string): Promise<BaseResponse>;
	resetPassword(password: string, code: string): Promise<BaseResponse>;
	changeUserData(
		name: string,
		email: string,
		password: string
	): Promise<UserDataResponse>;
	getUserData(): Promise<UserDataResponse>;
	userLogout(): Promise<BaseResponse>;
};
