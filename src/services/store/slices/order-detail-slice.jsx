import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import {
	_REQUEST,
	_SUCCESS,
	_ERROR,
	_LOGOUT,
	request,
	GET_ORDER,
} from '../../api/yandex_api';

const initialState = {
	name: null,
	orderId: 0,
	loading: {
		isError: false,
		isErrorMessage: undefined,
		isRequested: true,
	},
	isChange: false,
	isLogout: false,
};

const orderSlice = createSlice({
	name: 'order-store',
	initialState,
	reducers: {
		setOrder(state, action) {
			state.name = action.payload.name;
			state.orderId = action.payload.order.number;
		},
		[_LOGOUT]: (state) => {
			state.loading.isError = false;
			state.loading.isRequested = true;
			state.loading.isLogout = true;
		},
		[_REQUEST]: (state) => {
			state.loading.isError = false;
			state.loading.isRequested = true;
			state.loading.isLogout = false;
		},
		[_SUCCESS]: (state, action) => {
			state.name = action.payload.name;
			state.orderId = action.payload.order.number;
			state.loading.isRequested = false;
			state.loading.isLogout = false;
			state.isChange = !state.isChange;
		},
		[_ERROR]: (state, action) => {
			state.loading.isErrorMessage = action.payload;
			state.loading.isError = true;
			state.loading.isRequested = false;
			state.loading.isLogout = false;
		},
	},
});

export const useOrderActions = () => {
	const dispatch = useDispatch();
	return {
		setOrder: (payload) => dispatch(orderSlice.actions.setOrder(payload)),
		getOrder: (basketContent) => dispatch(getOrder(basketContent)),
	};
};

/**
 * @param {*} basketContent
 * @returns true - не требуется редирект на login, false- требуется
 */
const getOrder = (basketContent) => async (dispatch) => {
	dispatch(orderSlice.actions[_REQUEST]());
	return await request(
		GET_ORDER,
		'post',
		{
			ingredients: basketContent,
		},
		true
	)
		.then((response) => {
			if (!response.success) {
				dispatch(orderSlice.actions[_ERROR](response.data));
				return true;
			}
			dispatch(orderSlice.actions[_SUCCESS](response));
			return true;
		})
		.catch((error) => {
			if (
				error.message === 'Token is invalid' ||
				error.message === 'invalid token' ||
				error.message === 'jwt malformed'
			) {
				//Здесь могут приходить разные ошибки авторизации, например, когда токен скомпроментирован
				localStorage.clear('accessToken');
				localStorage.clear('refreshToken');
				dispatch(orderSlice.actions[_LOGOUT](error.message));
				return false;
			}

			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				dispatch(orderSlice.actions[_ERROR](error.response.data.message));
				return true;
			}

			dispatch(orderSlice.actions[_ERROR](error.message));
			return true;
		});
};

export default orderSlice.reducer;
