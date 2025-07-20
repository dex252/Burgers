import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { _SUCCESS, _ERROR, _REQUEST, Auth } from '../../api/yandex_api';

const initialState = {
	isAuthenticated: false,
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
		setUser(state, action) {
			state.user = action.payload;
		},
		[_REQUEST]: (state) => {
			state.isAuthenticated = false;
			state.loading.isSpinner = true;
			state.loading.isError = false;
		},
		[_SUCCESS]: (state, action) => {
			state.isAuthenticated = true;
			state.loading.isSpinner = false;
			state.user = action.payload;
		},
		[_ERROR]: (state, action) => {
			state.isAuthenticated = true;
			state.loading.isSpinner = false;
			state.loading.isErrorMessage = action.payload;
			state.loading.isError = true;
			state.loading.withContent = true;
			state.user = undefined;
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
			dispatch(authSlice.actions[_ERROR](e.message));
			return false;
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
	};
};

export default authSlice.reducer;
