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
				guid: '',
			}));
		},
		updateCount(state, action) {
			const { id, delta } = action.payload;
			const index = state.ingredients.findIndex((item) => item._id === id);
			if (index !== -1) {
				const ingredient = state.ingredients[index];
				ingredient.count = ingredient.count + delta;
			}
		},
	},
});

export const useIngredientsActions = () => {
	const dispatch = useDispatch();
	return {
		setIngredients: (payload) =>
			dispatch(ingredientsSlice.actions.setIngredients(payload)),
		updateCount: (payload) =>
			dispatch(ingredientsSlice.actions.updateCount(payload)),
	};
};

export default ingredientsSlice.reducer;
