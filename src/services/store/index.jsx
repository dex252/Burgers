import { combineSlices, configureStore } from '@reduxjs/toolkit';
import IngredientsReducer from './slices/ingredients-slice.jsx';
import BasketReducer from './slices/basket-constructor-slice.jsx';
import DetailsReducer from './slices/ingredient-details-slice.jsx';
import OrderReducer from './slices/order-detail-slice.jsx';
import AuthReducer from './slices/auth-slice.jsx';
import apiMiddleware from '../middlewares/api-middleware.jsx';

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
