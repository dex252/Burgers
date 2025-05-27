import axios from 'axios';

const YANDEX_API = 'https://norma.nomoreparties.space';
export const GET_INGREDIENTS = '/api/ingredients';

const api = axios.create({ baseURL: YANDEX_API });

export const request = async (method) => {
	try {
		const response = await api.get(method);
		if (response.status === 200) {
			return response.data;
		}

		throw new Error(`${response.status} ${response.statusText}`);
	} catch (error) {
		throw new Error(error.message);
	}
};
