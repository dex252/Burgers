import axios from 'axios';

const YANDEX_API = 'https://norma.nomoreparties.space';
const GET_INGREDIENTS = '/api/ingredients';

const api = axios.create({ baseURL: YANDEX_API });

export const getIngredients = async () => {
	try {
		const response = await api.get(GET_INGREDIENTS);

		if (response.status === 200) {
			return response.data;
		}

		throw new Error(`${response.status} ${response.statusText}`);
	} catch (error) {
		throw new Error(error.message);
	}
};
