import { combineSlices, configureStore } from '@reduxjs/toolkit';

import apiMiddleware from '../middlewares/api-middleware';
import { socketMiddleware } from '../middlewares/socket-middleware';
import AuthReducer from './slices/auth-slice';
import BasketReducer from './slices/basket-constructor-slice';
import DetailsReducer from './slices/ingredient-details-slice';
import IngredientsReducer from './slices/ingredients-slice';
import OrderReducer from './slices/order-detail-slice';
import OrdersFeedReducer, {
	ordersFeedWsActions,
} from './slices/orders-feed-slice';
import OrdersHistoryReducer, {
	ordersHistoryWsActions,
} from './slices/orders-history-slice';

const rootReducer = combineSlices({
	IngredientsReducer,
	BasketReducer,
	DetailsReducer,
	OrderReducer,
	AuthReducer,
	OrdersFeedReducer,
	OrdersHistoryReducer,
});

const feedMiddleware = socketMiddleware(ordersFeedWsActions);
const historyMiddleware = socketMiddleware(ordersHistoryWsActions);

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({}).concat(
			apiMiddleware,
			feedMiddleware,
			historyMiddleware
		),
	devTools: {
		name: 'Burgers',
		trace: true,
	},
});

export type RootState = ReturnType<typeof rootReducer>;
