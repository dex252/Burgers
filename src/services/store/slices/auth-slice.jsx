import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { _SUCCESS, _ERROR, _REQUEST, Auth } from '../../api/yandex_api';

const initialState = {
	isAuthorization: false,
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
		setLogout(state, action) {
			//Не управляет состоянием авторизации пользователя
			console.info('%cLogout', 'background-color: white; color: purple');
			state.isLogout = action.payload;
		},
		setUser(state, action) {
			state.user = action.payload;
		},
		[_REQUEST]: (state) => {
			//state.isAuthorization = false;
			state.loading.isSpinner = true;
			state.loading.isError = false;
			console.info('%cREQUEST', 'background-color: white; color: blue');
		},
		[_SUCCESS]: (state) => {
			console.info('%cSUCCESS', 'background-color: white; color: green');
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

const login = (email, password) => async (dispatch) => {
	dispatch(authSlice.actions[_REQUEST]());
	return await Auth.login(email, password)
		.then((data) => {
			const { accessToken, refreshToken, success, user } = data;

			if (success !== true) {
				localStorage.clear('accessToken');
				localStorage.clear('refreshToken');
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
			localStorage.clear('accessToken');
			localStorage.clear('refreshToken');
			dispatch(authSlice.actions[_ERROR](e.message));
			return false;
		});
};

const register = (email, password, name) => async (dispatch) => {
	dispatch(authSlice.actions[_REQUEST]());
	return await Auth.register(email, password, name)
		.then((data) => {
			const { accessToken, refreshToken, success, user } = data;

			if (success !== true) {
				localStorage.clear('accessToken');
				localStorage.clear('refreshToken');
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
			localStorage.clear('accessToken');
			localStorage.clear('refreshToken');
			dispatch(authSlice.actions[_ERROR](e.message));

			return false;
		});
};

const forgotPassword = (email) => async (dispatch) => {
	dispatch(authSlice.actions[_REQUEST]());
	return await Auth.forgotPassword(email)
		.then((data) => {
			const { success, message } = data;

			console.info(message);

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

const resetPassword = (password, code) => async (dispatch) => {
	dispatch(authSlice.actions[_REQUEST]());
	return await Auth.resetPassword(password, code)
		.then((data) => {
			const { success, message } = data;

			console.info(message);

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

const changeUserData = (name, email, password) => async (dispatch) => {
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
			var message = e.message;
			if (e.response && e.response.data && e.response.data.message) {
				message = e.response.data.message;
			}

			dispatch(authSlice.actions[_ERROR](message));
			return false;
		});
};

const getUserData = () => async (dispatch) => {
	dispatch(authSlice.actions[_REQUEST]());
	return await Auth.getUserData()
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
};

const setAuthorization = () => async (dispatch) => {
	const isTokenExist = localStorage.getItem('accessToken');
	if (isTokenExist) {
		dispatch(authSlice.actions.setAuthorization(true));
		return true;
	}

	dispatch(authSlice.actions.setAuthorization(false));
	return false;
};

const userLogout = () => async (dispatch) => {
	dispatch(authSlice.actions[_REQUEST]());
	return await Auth.userLogout()
		.then((data) => {
			const { success, message } = data;

			if (success !== true) {
				dispatch(authSlice.actions[_ERROR](message));
				return null;
			}

			//Удачный выход - обновляем токены
			localStorage.clear('accessToken');
			localStorage.clear('refreshToken');
			//Выключаем спиннер
			dispatch(authSlice.actions[_SUCCESS]());
			//Убираем авторизацию с пользователя
			dispatch(setAuthorization(false));
			return null;
		})
		.catch((e) => {
			dispatch(authSlice.actions[_ERROR](e.message));
			return null;
		});
};

export const useAuthActions = () => {
	const dispatch = useDispatch();
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
		setAuthorization: (payload) => dispatch(setAuthorization(payload)),
		userLogout: () => dispatch(userLogout()),
	};
};

export default authSlice.reducer;
