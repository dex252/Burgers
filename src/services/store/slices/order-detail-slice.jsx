import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const initialState = {
	price: 0,
	orderId: 0,
};

const orderSlice = createSlice({
	name: 'order-store',
	initialState,
	reducers: {
		setOrder(state, action) {
			state.price = action.payload.price;
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
