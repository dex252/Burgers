import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import type { History, HistoryOrder } from '@/utils/prop-types-ts';
import type { OrdersFeedState, AppDispatch } from '@/utils/store-types';

const initialState: OrdersFeedState = {
	orders: [],
	loading: {
		isError: false,
		isErrorMessage: undefined,
		isRequested: true,
		isSpinner: true,
	},
};

const ordersFeedSlice = createSlice({
	name: 'orders-feed-store',
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

export const useOrdersFeedActions = (): {
	init: (payload: History) => void;
	add: (payload: HistoryOrder) => void;
	clear: () => void;
} => {
	const dispatch = useDispatch<AppDispatch>();
	return {
		init: (payload) => dispatch(ordersFeedSlice.actions.init(payload)),
		add: (payload) => dispatch(ordersFeedSlice.actions.add(payload)),
		clear: () => dispatch(ordersFeedSlice.actions.clear()),
	};
};

export default ordersFeedSlice.reducer;
