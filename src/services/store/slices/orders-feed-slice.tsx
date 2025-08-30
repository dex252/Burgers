import { _ERROR, _REQUEST, _SUCCESS } from '@/services/api/yandex_api';
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
		[_REQUEST]: (state) => {
			state.loading.isError = false;
			state.loading.isRequested = true;
			state.loading.isLogout = false;
		},
		[_SUCCESS]: (state, action) => {
			state.orders = action.payload.orders;
			state.loading.isRequested = false;
		},
		[_ERROR]: (state, action) => {
			state.loading.isErrorMessage = action.payload;
			state.loading.isError = true;
			state.loading.isRequested = false;
			state.loading.isLogout = false;
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
