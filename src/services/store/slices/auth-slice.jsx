import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { _SUCCESS, _ERROR, _REQUEST, Auth } from '../../api/yandex_api';

const initialState = {
	isAuthenticated: false,
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
		// updateCount(state, action) {
		// 	const { id, delta } = action.payload;
		// 	return {
		// 		...state,
		// 		ingredients: state.ingredients.map((item) =>
		// 			item._id === id ? { ...item, count: item.count + delta } : item
		// 		),
		// 	};
		// },
		// clearCounts(state) {
		// 	return {
		// 		...state,
		// 		ingredients: state.ingredients.map((item) => ({ ...item, count: 0 })),
		// 	};
		// },
		[_REQUEST]: (state) => {
			state.isAuthenticated = false;
			state.loading.isSpinner = true;
			state.loading.isError = false;
		},
		[_SUCCESS]: (state) => {
			state.isAuthenticated = true;
			state.loading.isSpinner = false;
		},
		[_ERROR]: (state, action) => {
			state.isAuthenticated = true;
			state.loading.isSpinner = false;
			state.loading.isErrorMessage = action.payload;
			state.loading.isError = true;
			state.loading.withContent = true;
		},
	},
});

const login = (email, password) => async (dispatch) => {
	dispatch(authSlice.actions[_REQUEST]());
	return await Auth.login(email, password)
		.then((e) => {
			console.info(e); //сохранить токены
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
		// updateCount: (payload) => dispatch(authSlice.actions.updateCount(payload)),
		// clearCounts: (payload) => dispatch(authSlice.actions.clearCounts(payload)),
	};
};

export default authSlice.reducer;
