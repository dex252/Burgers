import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const initialState = {
	ingredients: [],
};

const ingredientsSlice = createSlice({
	name: 'ingredients-store',
	initialState,
	reducers: {
		setIngredients(state, action) {
			state.ingredients = action.payload.map((ingredient) => ({
				...ingredient,
				count: 0,
				guid: ingredient._id,
			}));
		},
	},
});

export const useIngredientsActions = () => {
	const dispatch = useDispatch();
	return {
		setIngredients: (payload) =>
			dispatch(ingredientsSlice.actions.setIngredients(payload)),
	};
};

export default ingredientsSlice.reducer;
