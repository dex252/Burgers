import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const initialState = {
	protectedRules: {
		'/reset-password': '/forgot-password',
	},
	currentPath: undefined,
	currentValue: undefined,
};

const routerRulesSlice = createSlice({
	name: 'router-rules-store',
	initialState,
	reducers: {
		setCurrentRoute(state, action) {
			state.currentPath = action.payload.path;
			state.currentValue = action.payload.value;
		},
		clearCurrentRoute(state) {
			state.currentPath = undefined;
			state.currentValue = undefined;
		},
	},
});

export const useRouterRulesActions = () => {
	const dispatch = useDispatch();
	return {
		setCurrentRoute: (path, value) =>
			dispatch(routerRulesSlice.actions.setCurrentRoute({ path, value })),
		clearCurrentRoute: (payload) =>
			dispatch(routerRulesSlice.actions.clearCurrentRoute(payload)),
	};
};

export default routerRulesSlice.reducer;
