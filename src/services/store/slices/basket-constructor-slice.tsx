import { useAppDispatch } from '@/utils/hooks';
import { createSlice } from '@reduxjs/toolkit';

import type { Ingredient } from '@/utils/prop-types-ts';
import type { BasketConstructorState } from '@/utils/store-types';

export const initialState: BasketConstructorState = {
	bun: null,
	ingredients: [],
};

const basketSlice = createSlice({
	name: 'basket-store',
	initialState,
	reducers: {
		addInBasket(state, action) {
			state.ingredients = [
				...state.ingredients,
				{
					...action.payload.ingredient,
					guid: action.payload.guid,
					index: action.payload.index,
				},
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
		unSetBun(state) {
			state.bun = null;
		},
		sortIngredient(state, action) {
			const сopy = [...state.ingredients];

			const draggedIndex = сopy.findIndex(
				(item) => item.guid === action.payload.draggedGuid
			);
			const targetIndex = сopy.findIndex(
				(item) => item.guid === action.payload.targetGuid
			);

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

export const useBasketActions = (): {
	addInBasket: (payload: {
		ingredient: Ingredient;
		guid: string;
		index: number;
	}) => void;
	removeFromBasket: (payload: { guid: string | undefined }) => void;
	setBun: (payload: Ingredient) => void;
	unSetBun: () => void;
	sortIngredient: (payload: {
		draggedGuid: string | undefined;
		targetGuid: string | undefined;
	}) => void;
	clearBasket: () => void;
} => {
	const dispatch = useAppDispatch();
	return {
		addInBasket: (payload) =>
			dispatch(basketSlice.actions.addInBasket(payload)),
		removeFromBasket: (payload) =>
			dispatch(basketSlice.actions.removeFromBasket(payload)),
		setBun: (payload) => dispatch(basketSlice.actions.setBun(payload)),
		unSetBun: () => dispatch(basketSlice.actions.unSetBun()),
		sortIngredient: (payload) =>
			dispatch(basketSlice.actions.sortIngredient(payload)),
		clearBasket: () => dispatch(basketSlice.actions.clearBasket()),
	};
};

export default basketSlice.reducer;
