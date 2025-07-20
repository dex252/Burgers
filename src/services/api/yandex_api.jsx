import axios from 'axios';

export const _REQUEST = '_REQUEST';
export const _SUCCESS = '_SUCCESS';
export const _ERROR = '_ERROR';

const YANDEX_API = 'https://norma.nomoreparties.space';

export const GET_INGREDIENTS = '/api/ingredients';
export const GET_ORDER = '/api/orders';
export const LOGIN = '/api/auth/login';
export const REGISTER = '/api/auth/register';
export const LOGOUT = '/api/auth/logout';
export const GET_TOKEN = '/api/auth/token';
export const GET_USER_DATA = '/api/auth/user';
export const REFRESH_USER_DATA = '/api/auth/user';
export const FORGOT_PASSWORD = '/api/password-reset';

const api = axios.create({ baseURL: YANDEX_API });
api.interceptors.request.use((config) => {
	if (!config.isToken) {
		return config;
	}

	config.headers = {
		Authorization: `${localStorage.getItem('accessToken')}`,
	};

	return config;
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.message === 'jwt expired') {
			return await refreshToken();
		}

		return Promise.reject(error);
	}
);

export const Auth = {
	login: async (email, password) => login(email, password),
	register: async (email, password, name) => register(email, password, name),
	forgotPassword: async (email) => forgotPassword(email),
};

export const request = async (
	url,
	method = 'get',
	data = null,
	isToken = true
) => {
	const executeRequest = async () => {
		const config = {
			method: method.toLowerCase(),
			url,
			isToken: isToken,
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
	} catch (error) {
		if (error.message !== 'jwt expired') {
			throw new Error(
				`${error.response.status} ${error.response.data.message}`
			);
		}

		return await executeRequest();
	}
};

const refreshToken = async () => {
	await api
		.request({
			method: 'post',
			url: GET_TOKEN,
			data: {
				token: localStorage.getItem('refreshToken'),
			},
			isToken: false,
		})
		.then((data) => {
			const { accessToken, refreshToken, success } = data;
			if (success !== true) {
				return Promise.reject(data);
			}

			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
		})
		.catch((e) => {
			if (e.response && e.response.data && e.response.data.message) {
				throw new Error(e.response.data.message);
			}

			throw new Error(e.message);
		});
};

const login = async (email, password) => {
	return request(
		LOGIN,
		'post',
		{
			email: email,
			password: password,
		},
		false
	);
};

const register = async (email, password, name) => {
	return request(
		REGISTER,
		'post',
		{
			email: email,
			password: password,
			name: name,
		},
		false
	);
};

const forgotPassword = async (email) => {
	return request(
		FORGOT_PASSWORD,
		'post',
		{
			email: email,
		},
		false
	);
};
