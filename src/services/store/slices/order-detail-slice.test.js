import { describe, it, expect } from 'vitest';

import reducer, { initialState } from './order-detail-slice';

describe('order-slice', () => {
	it('Возвращает начальное состояние', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it('Установить созданный заказ setOrder', () => {
		const orderPayload = {
			name: 'Новый заказ',
			order: { number: 12345 },
		};

		expect(
			reducer(initialState, {
				type: 'order-store/setOrder',
				payload: orderPayload,
			})
		).toEqual({
			...initialState,
			name: orderPayload.name,
			orderId: orderPayload.order.number,
		});
	});

	it('Закрыть модальное окно созданного заказа handleCloseModal', () => {
		const stateWithError = {
			...initialState,
			loading: {
				...initialState.loading,
				isError: true,
				isErrorMessage: 'Текст ошибки',
			},
		};

		expect(
			reducer(stateWithError, {
				type: 'order-store/handleCloseModal',
			})
		).toEqual({
			...stateWithError,
			loading: {
				...stateWithError.loading,
				isError: false,
			},
		});
	});

	it('Срок действия токена авторизации истек _LOGOUT', () => {
		expect(
			reducer(initialState, {
				type: 'order-store/_LOGOUT',
			})
		).toEqual({
			...initialState,
			loading: {
				...initialState.loading,
				isError: false,
				isRequested: true,
				isLogout: true,
			},
		});
	});

	it('Выполнить _REQUEST', () => {
		expect(
			reducer(initialState, {
				type: 'order-store/_REQUEST',
			})
		).toEqual({
			...initialState,
			loading: {
				...initialState.loading,
				isError: false,
				isRequested: true,
				isLogout: false,
			},
		});
	});

	it('Выполнить _SUCCESS', () => {
		const successPayload = {
			name: 'Новый заказr',
			order: { number: 67890 },
		};

		const stateWithRequest = {
			...initialState,
			loading: {
				...initialState.loading,
				isRequested: true,
			},
		};

		const result = reducer(stateWithRequest, {
			type: 'order-store/_SUCCESS',
			payload: successPayload,
		});

		expect(result).toEqual({
			name: successPayload.name,
			orderId: successPayload.order.number,
			loading: {
				...initialState.loading,
				isRequested: false,
				isLogout: false,
			},
			isChange: true,
		});
	});

	it('Выполнить _ERROR', () => {
		const errorMessage = 'Текст ошибки';

		expect(
			reducer(initialState, {
				type: 'order-store/_ERROR',
				payload: errorMessage,
			})
		).toEqual({
			...initialState,
			loading: {
				...initialState.loading,
				isErrorMessage: errorMessage,
				isError: true,
				isRequested: false,
				isLogout: false,
			},
		});
	});
});
