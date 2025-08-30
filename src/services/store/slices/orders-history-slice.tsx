import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import type { History, HistoryOrder } from '@/utils/prop-types-ts';
import type { OrdersHistoryState, AppDispatch } from '@/utils/store-types';

const initialState: OrdersHistoryState = {
	orders: [],
	loading: {
		isError: false,
		isErrorMessage: undefined,
		isRequested: true,
		isLogout: false,
	},
};

const ordersHistorySlice = createSlice({
	name: 'orders-history-store',
	initialState,
	reducers: {
		init(state, action) {
			state.orders = action.payload.orders;
		},
		add(state, action) {
			state.orders = [
				...state.orders,
				{
					...action.payload,
				},
			];
		},
		clear(state) {
			state.orders = [];
		},
	},
});

export const useOrdersHistoryActions = (): {
	init: (payload: History) => void;
	add: (payload: HistoryOrder) => void;
	clear: () => void;
} => {
	const dispatch = useDispatch<AppDispatch>();
	return {
		init: (payload) => dispatch(ordersHistorySlice.actions.init(payload)),
		add: (payload) => dispatch(ordersHistorySlice.actions.add(payload)),
		clear: () => dispatch(ordersHistorySlice.actions.clear()),
	};
};

export default ordersHistorySlice.reducer;
