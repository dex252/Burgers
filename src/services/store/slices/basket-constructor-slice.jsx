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
			const { ingredient, guid, index } = action.payload;
			state.ingredients = [
				...state.ingredients,
				{ ...ingredient, guid: guid, index: index },
			];
		},
		removeFromBasket(state, action) {
			state.ingredients = state.ingredients.filter(
				(item) => item.guid !== action.payload.guid
			);
		},
		clearBasket(state) {
			state.ingredients = [];
			state.bun = null;
		},
		setBun(state, action) {
			state.bun = action.payload;
		},
		unSetBun(state, action) {
			state.bun = action.payload;
		},
		sortIngredient(state, action) {
			const { draggedGuid, targetGuid } = action.payload;
			const сopy = [...state.ingredients];

			const draggedIndex = сopy.findIndex((item) => item.guid === draggedGuid);
			const targetIndex = сopy.findIndex((item) => item.guid === targetGuid);

			const [movedItem] = сopy.splice(draggedIndex, 1);
			const updated = [
				...сopy.slice(0, targetIndex),
				movedItem,
				...сopy.slice(targetIndex),
			];

			state.ingredients = updated.map((item, index) => ({
				...item,
				index: index,
			}));
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
		clearBasket: (payload) =>
			dispatch(basketSlice.actions.clearBasket(payload)),
	};
};

export default basketSlice.reducer;
