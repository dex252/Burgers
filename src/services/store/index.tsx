import { combineSlices, configureStore } from '@reduxjs/toolkit';

import apiMiddleware from '../middlewares/api-middleware';
import AuthReducer from './slices/auth-slice';
import BasketReducer from './slices/basket-constructor-slice';
import DetailsReducer from './slices/ingredient-details-slice';
import IngredientsReducer from './slices/ingredients-slice';
import OrderReducer from './slices/order-detail-slice';

const rootReducer = combineSlices({
	IngredientsReducer,
	BasketReducer,
	DetailsReducer,
	OrderReducer,
	AuthReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({}).concat(apiMiddleware),
	devTools: {
		name: 'Burgers',
		trace: true,
	},
});
