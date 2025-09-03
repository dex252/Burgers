import { useAppDispatch } from '@/utils/hooks';
import { createSlice } from '@reduxjs/toolkit';

import { _SUCCESS, _ERROR, _REQUEST, Auth } from '../../api/yandex_api';

import type { AppThunk } from '@/utils/hooks';
import type { User } from '@/utils/prop-types-ts';
import type { AuthState } from '@/utils/store-types';

const initialState: AuthState = {
	isAuthorization: false,
	isLoadingAuthorization: true,
	/**
	 * Сообщает о том, что пользователь вынужденно разлогинился
	 * Управляет отображением модального окна с заказом при возникновении ошибки, чтобы не очищать состав заказа
	 */
	isLogout: false,
	user: undefined,
	loading: {
		isError: false,
		isErrorMessage: undefined,
		isSpinner: false,
		withContent: true,
	},
};

const authSlice = createSlice({
	name: 'auth-store',
	initialState,
	reducers: {
		/**
		 * Задается только при ошибке авторизации во время выполнения какого-либо запроса
		 * @param {*} state
		 * @param {*} action
		 */
		setAuthorization(state, action) {
			state.isAuthorization = action.payload;
		},
		setLoading: (state, action) => {
			state.isLoadingAuthorization = action.payload;
		},
		setLogout(state, action) {
			//Не управляет состоянием авторизации пользователя
			// console.info('%cLogout', 'background-color: white; color: purple');
			state.isLogout = action.payload;
		},
		setUser(state, action) {
			state.user = action.payload;
		},
		[_REQUEST]: (state) => {
			//state.isAuthorization = false;
			state.loading.isSpinner = true;
			state.loading.isError = false;
			// console.info('%cREQUEST', 'background-color: white; color: blue');
		},
		[_SUCCESS]: (state) => {
			// console.info('%cSUCCESS', 'background-color: white; color: green');
			state.loading.isSpinner = false;
		},
		[_ERROR]: (state, action) => {
			state.isAuthorization = false;
			state.loading.isSpinner = false;
			state.loading.isErrorMessage = action.payload;
			state.loading.isError = true;
			state.loading.withContent = true;
			state.user = undefined;
			console.info('%cERROR', 'background-color: white; color: red');
		},
	},
});

const login =
	(email: string, password: string): AppThunk<Promise<boolean>> =>
	async (dispatch) => {
		dispatch(authSlice.actions[_REQUEST]());
		return await Auth.login(email, password)
			.then((data) => {
				const { accessToken, refreshToken, success, user } = data;

				if (success !== true) {
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
					dispatch(authSlice.actions[_ERROR](data));
					return false;
				}

				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('refreshToken', refreshToken);

				dispatch(authSlice.actions.setLogout(true));
				dispatch(authSlice.actions.setAuthorization(true));
				dispatch(authSlice.actions.setUser(user));
				dispatch(authSlice.actions[_SUCCESS]());
				return true;
			})
			.catch((e) => {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				dispatch(authSlice.actions[_ERROR](e.message));
				return false;
			});
	};

const register =
	(email: string, password: string, name: string): AppThunk<Promise<boolean>> =>
	async (dispatch) => {
		dispatch(authSlice.actions[_REQUEST]());
		return await Auth.register(email, password, name)
			.then((data) => {
				const { accessToken, refreshToken, success, user } = data;

				if (success !== true) {
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
					dispatch(authSlice.actions[_ERROR](data));
					return false;
				}

				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('refreshToken', refreshToken);

				dispatch(authSlice.actions.setLogout(true));
				dispatch(authSlice.actions.setUser(user));
				dispatch(authSlice.actions.setAuthorization(true));
				dispatch(authSlice.actions[_SUCCESS]());

				return true;
			})
			.catch((e) => {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				dispatch(authSlice.actions[_ERROR](e.message));

				return false;
			});
	};

const forgotPassword =
	(email: string): AppThunk<Promise<boolean>> =>
	async (dispatch) => {
		dispatch(authSlice.actions[_REQUEST]());
		return await Auth.forgotPassword(email)
			.then((data) => {
				const { success /*message*/ } = data;

				if (success !== true) {
					dispatch(authSlice.actions[_ERROR](data));
					return false;
				}

				dispatch(authSlice.actions[_SUCCESS]());
				return true;
			})
			.catch((e) => {
				dispatch(authSlice.actions[_ERROR](e.message));
				return false;
			});
	};

const resetPassword =
	(password: string, code: string): AppThunk<Promise<boolean>> =>
	async (dispatch) => {
		dispatch(authSlice.actions[_REQUEST]());
		return await Auth.resetPassword(password, code)
			.then((data) => {
				const { success /*message*/ } = data;

				if (success !== true) {
					dispatch(authSlice.actions[_ERROR](data));
					return false;
				}

				dispatch(authSlice.actions[_SUCCESS]());
				return true;
			})
			.catch((e) => {
				dispatch(authSlice.actions[_ERROR](e.message));
				return false;
			});
	};

const changeUserData =
	(name: string, email: string, password: string): AppThunk<Promise<boolean>> =>
	async (dispatch) => {
		dispatch(authSlice.actions[_REQUEST]());
		return await Auth.changeUserData(name, email, password)
			.then((data) => {
				const { success, user } = data;

				if (success !== true) {
					dispatch(authSlice.actions[_ERROR](data));
					return false;
				}

				dispatch(authSlice.actions.setUser(user));
				dispatch(authSlice.actions[_SUCCESS]());
				return true;
			})
			.catch((e) => {
				let message = e.message;
				if (e.response && e.response.data && e.response.data.message) {
					message = e.response.data.message;
				}

				dispatch(authSlice.actions[_ERROR](message));
				return false;
			});
	};

const getUserData = (): AppThunk<Promise<User | null>> => async (dispatch) => {
	dispatch(authSlice.actions[_REQUEST]());
	const userData = await Auth.getUserData()
		.then((data) => {
			const { success, user } = data;

			if (success !== true) {
				dispatch(authSlice.actions[_ERROR](data));
				return null;
			}

			dispatch(authSlice.actions.setUser(user));
			dispatch(authSlice.actions[_SUCCESS]());
			return user;
		})
		.catch((e) => {
			dispatch(authSlice.actions[_ERROR](e.message));
			return null;
		});

	return userData;
};

const setAuthorization =
	(): AppThunk<Promise<User | null>> => async (dispatch) => {
		dispatch(authSlice.actions.setAuthorization(false));
		const isTokenExist = localStorage.getItem('accessToken');
		if (isTokenExist) {
			const userData = await Auth.getUserData()
				.then((data) => {
					const { success, user } = data;

					if (success !== true) {
						dispatch(authSlice.actions[_ERROR](data));
						dispatch(authSlice.actions.setAuthorization(false));
						dispatch(authSlice.actions.setLoading(false));
						return null;
					}

					dispatch(authSlice.actions.setUser(user));
					dispatch(authSlice.actions[_SUCCESS]());
					dispatch(authSlice.actions.setAuthorization(true));
					dispatch(authSlice.actions.setLoading(false));
					return user;
				})
				.catch((e) => {
					dispatch(authSlice.actions[_ERROR](e.message));
					dispatch(authSlice.actions.setAuthorization(false));
					dispatch(authSlice.actions.setLoading(false));
					return null;
				});

			return userData;
		}

		dispatch(authSlice.actions.setAuthorization(false));
		dispatch(authSlice.actions.setUser(undefined));
		dispatch(authSlice.actions.setLoading(false));
		return null;
	};

const userLogout = (): AppThunk<Promise<void>> => async (dispatch) => {
	dispatch(authSlice.actions[_REQUEST]());
	return await Auth.userLogout()
		.then((data) => {
			const { success, message } = data;

			if (success !== true) {
				dispatch(authSlice.actions[_ERROR](message));
				return;
			}

			//Удачный выход - обновляем токены
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			//Выключаем спиннер
			dispatch(authSlice.actions[_SUCCESS]());
			//Убираем авторизацию с пользователя
			dispatch(authSlice.actions.setAuthorization(false));
			return;
		})
		.catch((e) => {
			dispatch(authSlice.actions[_ERROR](e.message));
			return;
		});
};

export const useAuthActions = (): {
	login: (email: string, password: string) => Promise<boolean>;
	register: (email: string, password: string, name: string) => Promise<boolean>;
	forgotPassword: (email: string) => Promise<boolean>;
	resetPassword: (password: string, code: string) => Promise<boolean>;
	changeUserData: (
		name: string,
		email: string,
		password: string
	) => Promise<boolean>;
	getUserData: () => Promise<User | null>;
	setLogout: (payload: boolean) => void;
	setAuthorization: () => Promise<User | null>;
	userLogout: () => Promise<void>;
} => {
	const dispatch = useAppDispatch();
	return {
		login: (email, password) => dispatch(login(email, password)),
		register: (email, password, name) =>
			dispatch(register(email, password, name)),
		forgotPassword: (email) => dispatch(forgotPassword(email)),
		resetPassword: (password, code) => dispatch(resetPassword(password, code)),
		changeUserData: (name, email, password) =>
			dispatch(changeUserData(name, email, password)),
		getUserData: () => dispatch(getUserData()),
		setLogout: (payload) => dispatch(authSlice.actions.setLogout(payload)),
		setAuthorization: () => dispatch(setAuthorization()),
		userLogout: () => dispatch(userLogout()),
	};
};

export default authSlice.reducer;
