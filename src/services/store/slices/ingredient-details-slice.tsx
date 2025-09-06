import { useAppDispatch } from '@/utils/hooks';
import { createSlice } from '@reduxjs/toolkit';

import type { Ingredient } from '@/utils/prop-types-ts';
import type { DetailsState } from '@/utils/store-types';

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
	const dispatch = useAppDispatch();
	return {
		setIngredient: (payload) =>
			dispatch(detailSlice.actions.setIngredient(payload)),
	};
};

export default detailSlice.reducer;
