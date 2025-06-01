import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
	_REQUEST,
	_SUCCESS,
	_ERROR,
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
};

const orderSlice = createSlice({
	name: 'order-store',
	initialState,
	reducers: {
		setOrder(state, action) {
			state.name = action.payload.name;
			state.orderId = action.payload.order.number;
		},
		[_REQUEST]: (state) => {
			state.loading.isError = false;
			state.loading.isRequested = true;
		},
		[_SUCCESS]: (state, action) => {
			state.name = action.payload.name;
			state.orderId = action.payload.order.number;
			state.loading.isRequested = false;
		},
		[_ERROR]: (state, action) => {
			state.loading.isErrorMessage = action.payload;
			state.loading.isError = true;
			state.loading.isRequested = false;
		},
	},
});

export const useOrderActions = () => {
	const dispatch = useDispatch();
	return {
		setOrder: (payload) => dispatch(orderSlice.actions.setOrder(payload)),
	};
};

export const getOrder = (basketContent) => (dispatch) => {
	dispatch(orderSlice.actions[_REQUEST]());
	return request(GET_ORDER, 'post', {
		ingredients: basketContent,
	})
		.then((response) => {
			if (!response.success) {
				dispatch(orderSlice.actions[_ERROR](response.data));
				return;
			}
			dispatch(orderSlice.actions[_SUCCESS](response));
		})
		.catch((error) => {
			dispatch(orderSlice.actions[_ERROR](error.message));
		});
};

export default orderSlice.reducer;
