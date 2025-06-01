import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const initialState = {
	name: null,
	orderId: 0,
};

const orderSlice = createSlice({
	name: 'order-store',
	initialState,
	reducers: {
		setOrder(state, action) {
			state.name = action.payload.name;
			state.orderId = action.payload.orderId;
		},
	},
});

export const useOrderActions = () => {
	const dispatch = useDispatch();
	return {
		setOrder: (payload) => dispatch(orderSlice.actions.setOrder(payload)),
	};
};

export default orderSlice.reducer;
