import { combineSlices, configureStore } from '@reduxjs/toolkit';
import IngredientsReducer from './slices/ingredients-slice.jsx';
import BasketReducer from './slices/basket-constructor-slice.jsx';
import DetailsReducer from './slices/ingredient-details-slice.jsx';
import OrderReducer from './slices/order-detail-slice.jsx';

const rootReducer = combineSlices({
	IngredientsReducer,
	BasketReducer,
	DetailsReducer,
	OrderReducer,
});

export const store = configureStore({
	reducer: rootReducer,
});
