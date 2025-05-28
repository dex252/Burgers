import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const initialState = {
	bun: null,
	ingredients: [],
};

const basketSlice = createSlice({
	name: 'basket-store',
	initialState,
	// eslint-disable-next-line no-undef
	devTools: process.env.NODE_ENV !== 'production',
	reducers: {
		addInBasket(state, action) {
			const guid =
				Date.now().toString(36) + Math.random().toString(36).substring(2);
			const index = state.ingredients.length;
			state.ingredients = [
				...state.ingredients,
				{ ...action.payload, guid: guid, index: index },
			];
		},
		removeFromBasket(state, action) {
			state.ingredients = state.ingredients.filter(
				(item) => item.guid !== action.payload.guid
			);
		},
		setBun(state, action) {
			state.bun = action.payload;
		},
		unSetBun(state, action) {
			state.bun = action.payload;
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
		setBun: (payload) => dispatch(basketSlice.actions.setBun(payload)),
		unSetBun: (payload) => dispatch(basketSlice.actions.unSetBun(payload)),
	};
};

export default basketSlice.reducer;
