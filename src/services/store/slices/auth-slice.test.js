import { describe, it, expect } from 'vitest';

import reducer, { initialState } from './auth-slice';

describe('auth-slice', () => {
	it('Возвращает начальное состояние', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it('Состояние авторизации setAuthorization', () => {
		expect(
			reducer(initialState, {
				type: 'auth-store/setAuthorization',
				payload: true,
			})
		).toEqual({
			...initialState,
			isAuthorization: true,
		});
	});

	it('Состояние загрузки информации о пользователе setLoading', () => {
		expect(
			reducer(initialState, {
				type: 'auth-store/setLoading',
				payload: false,
			})
		).toEqual({
			...initialState,
			isLoadingAuthorization: false,
		});
	});

	it('Состояние вынужденно разлогинившегося setLogout', () => {
		expect(
			reducer(initialState, {
				type: 'auth-store/setLogout',
				payload: true,
			})
		).toEqual({
			...initialState,
			isLogout: true,
		});
	});

	it('Сведения о пользователе setUser', () => {
		const user = { name: 'Slava', email: 'dex252rus@gmail.com' };

		expect(
			reducer(initialState, {
				type: 'auth-store/setUser',
				payload: user,
			})
		).toEqual({
			...initialState,
			user: user,
		});
	});

	it('Выполнить _REQUEST', () => {
		expect(
			reducer(initialState, {
				type: 'auth-store/_REQUEST',
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

	it('Выполнить _SUCCESS', () => {
		expect(
			reducer(initialState, {
				type: 'auth-store/_SUCCESS',
			})
		).toEqual({
			...initialState,
			loading: {
				...initialState.loading,
				isSpinner: false,
			},
		});
	});

	it('Выполнить _ERROR', () => {
		const errorMessage = 'Authentication failed';

		expect(
			reducer(initialState, {
				type: 'auth-store/_ERROR',
				payload: errorMessage,
			})
		).toEqual({
			...initialState,
			isAuthorization: false,
			user: undefined,
			loading: {
				...initialState.loading,
				isSpinner: false,
				isError: true,
				isErrorMessage: errorMessage,
				withContent: true,
			},
		});
	});
});
