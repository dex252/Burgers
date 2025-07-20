import axios from 'axios';

export const _REQUEST = '_REQUEST';
export const _SUCCESS = '_SUCCESS';
export const _ERROR = '_ERROR';
export const _LOGOUT = '_LOGOUT';

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
export const RESET_PASSWORD = '/api/password-reset/reset';

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
		if (error.message === 'jwt expired' || error.status === 403) {
			return await refreshToken();
		}

		return Promise.reject(error);
	}
);

export const Auth = {
	login: async (email, password) => login(email, password),
	register: async (email, password, name) => register(email, password, name),
	forgotPassword: async (email) => forgotPassword(email),
	resetPassword: async (password, code) => resetPassword(password, code),
	changeUserData: async (name, email, password) =>
		changeUserData(name, email, password),
};

export const request = async (
	url,
	method = 'get',
	data = null,
	isToken = false
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
		//В reject 200 может попасть только при успешной проверке токена
		if (
			(error.status && error.status == 200) ||
			error.message === 'jwt expired'
		) {
			return await executeRequest();
		}

		if (error.response && error.response.data && error.response.data.message) {
			throw new Error(error.response.data.message);
		}

		throw error;
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
		})
		.then((response) => {
			const { accessToken, refreshToken, success } = response.data;
			if (success !== true) {
				return Promise.reject(response.data);
			}

			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
			return Promise.reject(response);
		})
		.catch((e) => {
			//Не проверяем текст ошибки, нам и так известно, что это проверка токена
			if (e.status && e.status === 200) {
				throw e;
			}

			if (e.response && e.response.data && e.response.data.message) {
				throw new Error(e.response.data.message);
			}

			if (e.message) {
				throw new Error(e.message);
			}

			throw e;
		});
};

const login = async (email, password) => {
	return request(LOGIN, 'post', {
		email: email,
		password: password,
	});
};

const register = async (email, password, name) => {
	return request(REGISTER, 'post', {
		email: email,
		password: password,
		name: name,
	});
};

const forgotPassword = async (email) => {
	return request(FORGOT_PASSWORD, 'post', {
		email: email,
	});
};

const resetPassword = async (password, code) => {
	return request(FORGOT_PASSWORD, 'post', {
		password: password,
		token: code,
	});
};

const changeUserData = async (name, email, password) => {
	return request(REFRESH_USER_DATA, 'patch', {
		name: name,
		password: password,
		email: email,
	});
};
