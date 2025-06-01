import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const initialState = {
	bun: null,
	ingredients: [],
};

const basketSlice = createSlice({
	name: 'basket-store',
	initialState,
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
		sortIngredient(state, action) {
			const { draggedGuid, targetGuid } = action.payload;
			const draggedIndex = state.ingredients.findIndex(
				(item) => item.guid === draggedGuid
			);
			const targetIndex = state.ingredients.findIndex(
				(item) => item.guid === targetGuid
			);

			const [movedItem] = state.ingredients.splice(draggedIndex, 1);
			state.ingredients.splice(targetIndex, 0, movedItem);

			state.ingredients.forEach((item, index) => {
				item.index = index;
			});
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
		sortIngredient: (payload) =>
			dispatch(basketSlice.actions.sortIngredient(payload)),
	};
};

export default basketSlice.reducer;
