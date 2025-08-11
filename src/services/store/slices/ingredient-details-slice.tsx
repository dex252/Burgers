import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import type { Ingredient } from '@/utils/prop-types-ts';
import type { AppDispatch, DetailsState } from '@/utils/store-types';

const initialState: DetailsState = {
	ingredient: null,
};

const detailSlice = createSlice({
	name: 'details-store',
	initialState,
	reducers: {
		setIngredient(state, action) {
			state.ingredient = action.payload;
		},
	},
});

export const useDetailsActions = (): {
	setIngredient: (payload: Ingredient) => void;
} => {
	const dispatch = useDispatch<AppDispatch>();
	return {
		setIngredient: (payload) =>
			dispatch(detailSlice.actions.setIngredient(payload)),
	};
};

export default detailSlice.reducer;
