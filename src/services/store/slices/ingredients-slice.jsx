import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
	_REQUEST,
	_SUCCESS,
	_ERROR,
	request,
	GET_INGREDIENTS,
} from '../../api/yandex_api';

const initialState = {
	ingredients: [],
	loading: {
		isError: false,
		isErrorMessage: undefined,
		isSpinner: false,
	},
};

const ingredientsSlice = createSlice({
	name: 'ingredients-store',
	initialState,
	reducers: {
		updateCount(state, action) {
			const { id, delta } = action.payload;
			const index = state.ingredients.findIndex((item) => item._id === id);
			if (index !== -1) {
				const ingredient = state.ingredients[index];
				ingredient.count = ingredient.count + delta;
			}
		},
		[_REQUEST]: (state) => {
			state.loading.isSpinner = true;
			state.loading.isError = false;
		},
		[_SUCCESS]: (state, action) => {
			state.loading.isSpinner = false;
			state.ingredients = action.payload.map((ingredient) => ({
				...ingredient,
				count: 0,
				guid: '',
			}));
		},
		[_ERROR]: (state, action) => {
			state.loading.isSpinner = false;
			state.loading.isErrorMessage = action.payload;
			state.loading.isError = true;
		},
	},
});

export const setIngredients = () => (dispatch) => {
	dispatch(ingredientsSlice.actions[_REQUEST]());

	return request(GET_INGREDIENTS)
		.then((response) => {
			if (!response.success) {
				dispatch(ingredientsSlice.actions[_ERROR](response.data));
				return;
			}
			dispatch(ingredientsSlice.actions[_SUCCESS](response.data));
		})
		.catch((error) => {
			dispatch(ingredientsSlice.actions[_ERROR](error.message));
		});
};

export const useIngredientsActions = () => {
	const dispatch = useDispatch();
	return {
		updateCount: (payload) =>
			dispatch(ingredientsSlice.actions.updateCount(payload)),
	};
};

export default ingredientsSlice.reducer;
