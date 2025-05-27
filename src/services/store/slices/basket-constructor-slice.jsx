import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const initialState = {
	ingredients: [],
};

const basketSlice = createSlice({
	name: 'basket-store',
	initialState,
	reducers: {
		addInBasket(state, action) {
			state.ingredients = [...state.ingredients, action.payload];
		},
		removeFromBasket(state, action) {
			state.ingredients = state.ingredients.filter(
				(item) => item.guid !== action.payload.guid
			);
		},
	},
});

export const useBasketActions = () => {
	const dispatch = useDispatch();
	return {
		addInBasket: (payload) =>
			dispatch(basketSlice.actions.addInBasket(payload)),
		removeFromBasket: (payload) =>
			dispatch(basketSlice.actions.removeFromBasket(payload)),
	};
};

export default basketSlice.reducer;
