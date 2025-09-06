import axios, { AxiosHeaders } from 'axios';

import type {
	BaseResponse,
	RefreshTokenResponse,
	UserDataResponse,
	UserLoginResponse,
	CustomAxiosRequestConfig,
	RequestType,
	AuthService,
} from '@/utils/api-types';
import type { InternalAxiosRequestConfig } from 'axios';

export const _REQUEST = '_REQUEST';
export const _SUCCESS = '_SUCCESS';
export const _ERROR = '_ERROR';
export const _LOGOUT = '_LOGOUT';

const YANDEX_API = 'https://norma.nomoreparties.space';

export const GET_INGREDIENTS = '/api/ingredients';
export const GET_ORDER = '/api/orders';
export const LOGIN = '/api/auth/login';
export const REGISTER = '/api/auth/register';
export const USER_LOGOUT = '/api/auth/logout';
export const GET_TOKEN = '/api/auth/token';
export const GET_USER_DATA = '/api/auth/user';
export const REFRESH_USER_DATA = '/api/auth/user';
export const FORGOT_PASSWORD = '/api/password-reset';
export const RESET_PASSWORD = '/api/password-reset/reset';

export const Auth: AuthService = {
	login: async (email: string, password: string) => login(email, password),
	register: async (email: string, password: string, name: string) =>
		register(email, password, name),
	forgotPassword: async (email: string) => forgotPassword(email),
	resetPassword: async (password: string, code: string) =>
		resetPassword(password, code),
	changeUserData: async (name: string, email: string, password: string) =>
		changeUserData(name, email, password),
	getUserData: async () => getUserData(),
	userLogout: async () => userLogout(),
};

const api = axios.create({ baseURL: YANDEX_API });
api.interceptors.request.use((_config: InternalAxiosRequestConfig) => {
	const config = _config as CustomAxiosRequestConfig;
	if (!config.isToken) {
		return config;
	}

	//небольшой костыль, т.к. запрос getOrder принимает запросы без токена, а нам нужно искусственно получить ошибку
	const token = localStorage.getItem('accessToken') ?? 'Bearer 1';
	const currentHeaders = config.headers
		? config.headers instanceof AxiosHeaders
			? config.headers.toJSON()
			: config.headers
		: {};

	config.headers = new AxiosHeaders({
		...currentHeaders,
		Authorization: token,
	});

	return config;
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (
			error.response &&
			error.response.data &&
			error.response.data.message === 'jwt expired'
		) {
			return await refreshToken(false);
		}

		return Promise.reject(error);
	}
);

export const request = async <Response, Data>(
	url: string,
	method: RequestType = 'get',
	data?: Data,
	isToken = false
): Promise<Response> => {
	const executeRequest = async (): Promise<Response> => {
		const config: CustomAxiosRequestConfig = {
			method: method.toLowerCase(),
			url: url,
			isToken: isToken,
			headers: new AxiosHeaders(),
		};

		if (data) {
			config.data = data;
		}

		const response = await api.request(config);
		if (response.status === 200) {
			return response.data;
		}

		throw new Error(`${response.status} ${response.statusText}`);
	};

	try {
		return await executeRequest();
		// Ошибки могут быть абсолютно разные, поэтому оставляем проверку на существование тех или иных полей
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		//В reject 200 может попасть только при успешной проверке токена вне зависимости от ошибки
		if (error.status && error.status == 200) {
			return await executeRequest();
		}

		if (error.response && error.response.data && error.response.data.message) {
			throw new Error(error.response.data.message);
		}

		throw error;
	}
};

export const refreshToken = async (
	isRejected = false
): Promise<RefreshTokenResponse> => {
	return await api
		.request<RefreshTokenResponse>({
			method: 'post',
			url: GET_TOKEN,
			data: {
				token: localStorage.getItem('refreshToken'),
			},
		})
		.then((response) => {
			const { accessToken, refreshToken, success } = response.data;
			if (success !== true) {
				return Promise.reject(response.data);
			}

			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);

			if (isRejected) {
				return Promise.reject(response);
			}

			return Promise.resolve(response.data);
		})
		.catch((e) => {
			//Не проверяем текст ошибки, нам и так известно, что это проверка токена
			if (e.status && e.status === 200) {
				throw e;
			}

			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			if (e.response && e.response.data && e.response.data.message) {
				throw new Error(e.response.data.message);
			}

			if (e.message) {
				throw new Error(e.message);
			}

			throw e;
		});
};

const login = async (
	email: string,
	password: string
): Promise<UserLoginResponse> => {
	return await request<UserLoginResponse, { email: string; password: string }>(
		LOGIN,
		'post',
		{
			email: email,
			password: password,
		}
	);
};

const register = async (
	email: string,
	password: string,
	name: string
): Promise<UserLoginResponse> => {
	return await request<
		UserLoginResponse,
		{ email: string; password: string; name: string }
	>(REGISTER, 'post', {
		email: email,
		password: password,
		name: name,
	});
};

const forgotPassword = async (email: string): Promise<BaseResponse> => {
	return await request<BaseResponse, { email: string }>(
		FORGOT_PASSWORD,
		'post',
		{
			email: email,
		}
	);
};

const resetPassword = async (
	password: string,
	code: string
): Promise<BaseResponse> => {
	return await request<BaseResponse, { password: string; token: string }>(
		FORGOT_PASSWORD,
		'post',
		{
			password: password,
			token: code,
		}
	);
};

const changeUserData = async (
	name: string,
	email: string,
	password: string
): Promise<UserDataResponse> => {
	return await request<
		UserDataResponse,
		{ name: string; email: string; password: string }
	>(
		REFRESH_USER_DATA,
		'patch',
		{
			name: name,
			password: password,
			email: email,
		},
		true
	);
};

const getUserData = async (): Promise<UserDataResponse> => {
	return await request<UserDataResponse, void>(
		GET_USER_DATA,
		'get',
		undefined,
		true
	);
};

const userLogout = async (): Promise<BaseResponse> => {
	return await request<BaseResponse, { token: string | null }>(
		USER_LOGOUT,
		'post',
		{
			token: localStorage.getItem('refreshToken'),
		}
	);
};
