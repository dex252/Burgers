import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const initialState = {
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

export const useDetailsActions = () => {
	const dispatch = useDispatch();
	return {
		setIngredient: (payload) =>
			dispatch(detailSlice.actions.setIngredient(payload)),
	};
};

export default detailSlice.reducer;
