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

const api = axios.create({ baseURL: YANDEX_API });

export const Auth = {
	login: async (email, password) => login(email, password),
	register: async (email, password, name) => register(email, password, name),
};

export const request = async (
	url,
	method = 'get',
	data = null,
	isToken = false
) => {
	const executeRequest = async () => {
		try {
			const config = {
				method: method.toLowerCase(),
				url,
			};

			if (data) {
				config.data = data;
			}

			if (isToken) {
				config.headers = {
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_h5sfm_0',
				};
			}

			const response = await api.request(config);
			if (response.status === 200) {
				return response.data;
			}

			if (response.status === 401 || response.status === 403) {
				throw new Error(response.status);
			}

			throw new Error(`${response.status} ${response.statusText}`);
		} catch (error) {
			if (
				error.response &&
				(error.response.status == 401 || error.response.status == 403)
			) {
				throw new Error(error.response.status);
			}

			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				throw new Error(error.response.data.message);
			}

			throw new Error(error.message);
		}
	};

	try {
		return await executeRequest();
	} catch (error) {
		//Нестрогое неравенство
		if (error.message != 401 && error.message != 403) {
			throw new Error(error);
		}

		await getAuth();
		return await executeRequest();
	}
};

const getAuth = async (
	token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_h5sfm_0'
) => {
	await api
		.request({
			method: 'post',
			url: GET_TOKEN,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((e) => console.info(e))
		.catch((e) => {
			if (e.response && e.response.data && e.response.data.message) {
				throw new Error(e.response.data.message);
			}

			throw new Error(e.message);
		});
};

const login = async (email, password) => {
	try {
		const response = await api.request({
			method: 'post',
			url: LOGIN,
			data: {
				email: email,
				password: password,
			},
		});
		if (response.status === 200) {
			return response.data;
		}

		throw new Error(`${response.status} ${response.statusText}`);
	} catch (e) {
		if (
			e.response &&
			e.response.status &&
			e.response.data &&
			e.response.data.message
		) {
			throw new Error(`${e.status} - ${e.response.data.message}`);
		}

		throw new Error(e.message);
	}
};

const register = async (email, password, name) => {
	try {
		const response = await api.request({
			method: 'post',
			url: REGISTER,
			data: {
				email: email,
				password: password,
				name: name,
			},
		});

		if (response.status === 200) {
			return response.data;
		}

		throw new Error(`${response.status} ${response.statusText}`);
	} catch (e) {
		if (
			e.response &&
			e.response.status &&
			e.response.data &&
			e.response.data.message
		) {
			throw new Error(`${e.status} - ${e.response.data.message}`);
		}

		throw new Error(e.message);
	}
};
