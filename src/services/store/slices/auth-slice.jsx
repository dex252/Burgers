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
				dispatch(authSlice.actions[_ERROR](data));
				return false;
			}

			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);

			dispatch(authSlice.actions[_SUCCESS](user));
			return true;
		})
		.catch((e) => {
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
				dispatch(authSlice.actions[_ERROR](data));
				return false;
			}

			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);

			dispatch(authSlice.actions[_SUCCESS](user));
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
	};
};

export default authSlice.reducer;
