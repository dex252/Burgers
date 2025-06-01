import axios from 'axios';

const YANDEX_API = 'https://norma.nomoreparties.space';
export const GET_INGREDIENTS = '/api/ingredients';
export const GET_ORDER = '/api/orders';

const api = axios.create({ baseURL: YANDEX_API });

export const request = async (url, method = 'get', data = null) => {
	try {
		const config = {
			method: method.toLowerCase(),
			url,
		};

		if (data) {
			config.data = data;
		}
		const response = await api.request(config);
		if (response.status === 200) {
			return response.data;
		}

		throw new Error(`${response.status} ${response.statusText}`);
	} catch (error) {
		if (error.response && error.response.data && error.response.data.message) {
			throw new Error(error.response.data.message);
		}

		throw new Error(error.message);
	}
};
