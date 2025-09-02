import {
	_ERROR,
	_REQUEST,
	_SUCCESS,
	GET_ORDER,
	request,
} from '@/services/api/yandex_api';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import type { History, HistoryOrder } from '@/utils/prop-types-ts';
import type {
	AppDispatch,
	AppThunk,
	OrdersDetailsActions,
	OrdersFeedState,
	TWsActions,
} from '@/utils/store-types';

const initialState: OrdersFeedState = {
	orders: [],
	total: 0,
	totalToday: 0,
	loading: {
		isError: false,
		isErrorMessage: undefined,
		isRequested: true,
		isSpinner: true,
	},
	order: undefined,
	loadingModal: {
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
		setOrder(state, action) {
			state.order = action.payload;
		},
		[_REQUEST]: (state) => {
			state.order = undefined;
			state.loadingModal.isError = false;
			state.loadingModal.isRequested = true;
			state.loadingModal.isSpinner = true;
		},
		[_SUCCESS]: (state, action) => {
			state.order = action.payload;
			state.loadingModal.isRequested = false;
			state.loadingModal.isSpinner = false;
		},
		[_ERROR]: (state, action) => {
			state.loadingModal.isErrorMessage = action.payload;
			state.order = undefined;
			state.loadingModal.isError = true;
			state.loadingModal.isSpinner = false;
		},
	},
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
				state.total = action.payload.total || 0;
				state.totalToday = action.payload.totalToday || 0;
				state.loading.isSpinner = false;
				state.loading.isError = false;
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

export const useOrdersFeedActions = (): OrdersDetailsActions => {
	const dispatch = useDispatch<AppDispatch>();
	return {
		getOrder: (orderNumber: number) => dispatch(getOrder(orderNumber)),
		setOrder: (historyOrder: HistoryOrder) =>
			dispatch(ordersFeedSlice.actions.setOrder(historyOrder)),
	};
};

const getOrder =
	(orderNumber: number): AppThunk<Promise<boolean>> =>
	async (dispatch) => {
		dispatch(ordersFeedSlice.actions[_REQUEST]());
		return await request<History, { orderNumber: number }>(
			`${GET_ORDER}/${orderNumber}`
		)
			.then((response) => {
				if (
					response.success === true &&
					response?.orders &&
					response.orders?.length > 0
				) {
					dispatch(ordersFeedSlice.actions[_SUCCESS](response.orders[0]));
					return true;
				}

				if (response.success === true) {
					dispatch(ordersFeedSlice.actions[_ERROR]('Заказ не найден'));
					return true;
				}
				dispatch(
					ordersFeedSlice.actions[_ERROR]('Ошибка при получении заказа')
				);
				return true;
			})
			.catch((error) => {
				if (
					error.response &&
					error.response.data &&
					error.response.data.message
				) {
					dispatch(
						ordersFeedSlice.actions[_ERROR](error.response.data.message)
					);
					return true;
				}

				dispatch(ordersFeedSlice.actions[_ERROR](error.message));
				return true;
			});
	};

export default ordersFeedSlice.reducer;
