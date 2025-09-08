import { useAppDispatch } from '@/utils/hooks';
import { createSlice } from '@reduxjs/toolkit';

import {
	_REQUEST,
	_SUCCESS,
	_ERROR,
	request,
	GET_INGREDIENTS,
} from '../../api/yandex_api';

import type { AppThunk } from '@/utils/hooks';
import type { BaseIngredient, Ingredient } from '@/utils/prop-types-ts';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { IngredientsState } from '../../../utils/store-types';

export const initialState: IngredientsState = {
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
			return {
				...state,
				ingredients: state.ingredients.map((item) =>
					item._id === action.payload.id
						? { ...item, count: item.count + action.payload.delta }
						: item
				),
			};
		},
		clearCounts(state) {
			return {
				...state,
				ingredients: state.ingredients.map((item) => ({ ...item, count: 0 })),
			};
		},
		[_REQUEST]: (state) => {
			state.loading.isSpinner = true;
			state.loading.isError = false;
		},
		[_SUCCESS]: (state, action: PayloadAction<Ingredient[]>) => {
			state.loading.isSpinner = false;
			state.ingredients = action.payload;
		},
		[_ERROR]: (state, action: PayloadAction<string>) => {
			state.loading.isSpinner = false;
			state.loading.isErrorMessage = action.payload;
			state.loading.isError = true;
		},
	},
});

export const setIngredients = (): AppThunk => (dispatch) => {
	dispatch(ingredientsSlice.actions[_REQUEST]());

	return request<{ success: boolean; data: BaseIngredient[] }, void>(
		GET_INGREDIENTS
	)
		.then((response) => {
			if (!response.success) {
				dispatch(
					ingredientsSlice.actions[_ERROR](
						'Ошибка при загрузке списка ингредиентов'
					)
				);
				return;
			}
			const ingredients = response.data.map(
				(ingredient: BaseIngredient): Ingredient => ({
					...ingredient,
					count: 0,
					guid: '',
					index: undefined,
				})
			);
			dispatch(ingredientsSlice.actions[_SUCCESS](ingredients));
		})
		.catch((error) => {
			dispatch(ingredientsSlice.actions[_ERROR](error.message));
		});
};

export const useIngredientsActions = (): {
	updateCount: (payload: { id: string; delta: number }) => void;
	clearCounts: () => void;
} => {
	const dispatch = useAppDispatch();

	return {
		updateCount: (payload) =>
			dispatch(ingredientsSlice.actions.updateCount(payload)),
		clearCounts: () => dispatch(ingredientsSlice.actions.clearCounts()),
	};
};

export default ingredientsSlice.reducer;
