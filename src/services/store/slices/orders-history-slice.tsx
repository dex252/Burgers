import { createAction, createSlice } from '@reduxjs/toolkit';

import type { History } from '@/utils/prop-types-ts';
import type { OrdersHistoryState, TWsActions } from '@/utils/store-types';

const initialState: OrdersHistoryState = {
	orders: [],
	loading: {
		isError: false,
		isErrorMessage: undefined,
		isRequested: true,
		isSpinner: true,
	},
};

const ordersHistorySlice = createSlice({
	name: 'orders-history-store',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(wsConnect, (state) => {
				state.loading.isSpinner = true;
				state.loading.isError = false;
			})
			.addCase(wsDisconnect, (state) => {
				state.loading.isSpinner = false;
				state.loading.isError = false;
				state.orders = [];
			})
			.addCase(wsOnMessage, (state, action) => {
				state.orders = action.payload.orders || [];
				state.loading.isSpinner = false;
			})
			.addCase(wsOnError, (state, action) => {
				state.loading.isErrorMessage = action.payload;
				state.loading.isError = true;
				state.loading.isRequested = false;
				state.loading.isSpinner = false;
			});
	},
});

export const wsConnect = createAction<string>('ordersHistory/wsConnect');
export const wsDisconnect = createAction('ordersHistory/wsDisconnect');
export const wsOnMessage = createAction<History>('ordersHistory/wsOnMessage');
export const wsOnError = createAction<string>('ordersHistory/wsOnError');

export const ordersHistoryWsActions: TWsActions<History, undefined> = {
	connect: wsConnect,
	disconnect: wsDisconnect,
	onMessage: wsOnMessage,
	onError: wsOnError,
};

export default ordersHistorySlice.reducer;
