import { describe, it, expect } from 'vitest';

import reducer, { initialState } from './orders-feed-slice';

describe('orders-feed-slice', () => {
	it('Возвращает начальное состояние', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it('Установить новый заказ setOrder', () => {
		const order = {
			_id: '1',
			number: 123,
			name: 'Новый заказ',
			status: 'done',
			ingredients: [],
			createdAt: '2023-01-01',
			updatedAt: '2023-01-01',
		};

		expect(
			reducer(initialState, {
				type: 'orders-feed-store/setOrder',
				payload: order,
			})
		).toEqual({
			...initialState,
			order,
		});
	});

	it('Выполнить _REQUEST', () => {
		expect(
			reducer(initialState, {
				type: 'orders-feed-store/_REQUEST',
			})
		).toEqual({
			...initialState,
			order: undefined,
			loadingModal: {
				...initialState.loadingModal,
				isError: false,
				isRequested: true,
				isSpinner: true,
			},
		});
	});

	it('Выполнить _SUCCESS', () => {
		const order = {
			_id: '1',
			number: 123,
			name: 'Новый заказ',
			status: 'done',
			ingredients: [],
			createdAt: '2023-01-01',
			updatedAt: '2023-01-01',
		};

		const stateWithRequest = {
			...initialState,
			loadingModal: {
				...initialState.loadingModal,
				isRequested: true,
				isSpinner: true,
			},
		};

		expect(
			reducer(stateWithRequest, {
				type: 'orders-feed-store/_SUCCESS',
				payload: order,
			})
		).toEqual({
			...stateWithRequest,
			order,
			loadingModal: {
				...stateWithRequest.loadingModal,
				isRequested: false,
				isSpinner: false,
			},
		});
	});

	it('Выполнить _ERROR', () => {
		const errorMessage = 'Error message';

		expect(
			reducer(initialState, {
				type: 'orders-feed-store/_ERROR',
				payload: errorMessage,
			})
		).toEqual({
			...initialState,
			order: undefined,
			loadingModal: {
				...initialState.loadingModal,
				isErrorMessage: errorMessage,
				isError: true,
				isSpinner: false,
			},
		});
	});

	it('Установить соединение по сокету wsConnect', () => {
		expect(
			reducer(initialState, {
				type: 'ordersFeed/wsConnect',
				payload: 'ws://test',
			})
		).toEqual({
			...initialState,
			loading: {
				...initialState.loading,
				isSpinner: true,
				isError: false,
			},
		});
	});

	it('Зазорвать соединение wsDisconnect', () => {
		const stateWithOrders = {
			...initialState,
			orders: [{ _id: '1', number: 123, name: 'Test' }],
			loading: {
				...initialState.loading,
				isSpinner: true,
			},
		};

		expect(
			reducer(stateWithOrders, {
				type: 'ordersFeed/wsDisconnect',
			})
		).toEqual({
			...stateWithOrders,
			orders: [],
			loading: {
				...stateWithOrders.loading,
				isSpinner: false,
			},
		});
	});

	it('Получить сообщение wsOnMessage', () => {
		const historyData = {
			orders: [
				{
					_id: '1',
					number: 123,
					name: 'Новый заказ',
					status: 'done',
					ingredients: [],
					createdAt: '2023-01-01',
					updatedAt: '2023-01-01',
				},
			],
			total: 100,
			totalToday: 10,
		};

		const stateWithLoading = {
			...initialState,
			loading: {
				...initialState.loading,
				isSpinner: true,
			},
		};

		expect(
			reducer(stateWithLoading, {
				type: 'ordersFeed/wsOnMessage',
				payload: historyData,
			})
		).toEqual({
			...stateWithLoading,
			orders: historyData.orders,
			total: historyData.total,
			totalToday: historyData.totalToday,
			loading: {
				...stateWithLoading.loading,
				isSpinner: false,
				isError: false,
			},
		});
	});

	it('Вызвать событие об ошибке wsOnError', () => {
		const errorMessage = 'Текст ошибки';

		const stateWithLoading = {
			...initialState,
			loading: {
				...initialState.loading,
				isSpinner: true,
				isRequested: true,
			},
		};

		expect(
			reducer(stateWithLoading, {
				type: 'ordersFeed/wsOnError',
				payload: errorMessage,
			})
		).toEqual({
			...stateWithLoading,
			loading: {
				...stateWithLoading.loading,
				isErrorMessage: errorMessage,
				isError: true,
				isRequested: false,
				isSpinner: false,
			},
		});
	});
});
