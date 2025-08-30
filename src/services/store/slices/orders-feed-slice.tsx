import { _ERROR, _REQUEST, _SUCCESS } from '@/services/api/yandex_api';
import { createAction, createSlice } from '@reduxjs/toolkit';

import type { History } from '@/utils/prop-types-ts';
import type { OrdersFeedState, TWsActions } from '@/utils/store-types';

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

export const wsConnect = createAction<string>('ordersFeed/wsConnect');
export const wsDisconnect = createAction('ordersFeed/wsDisconnect');
export const wsOnMessage = createAction<History>('ordersFeed/wsOnMessage');
export const wsOnError = createAction<string>('ordersFeed/wsOnError');

export const ordersFeedWsActions: TWsActions<History, undefined> = {
	connect: wsConnect,
	disconnect: wsDisconnect,
	onMessage: wsOnMessage,
	onError: wsOnError,
};

export default ordersFeedSlice.reducer;
