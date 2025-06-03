const apiMiddleware = (store) => (next) => async (action) => {
	if (typeof action === 'function') {
		return action(store.dispatch, store.getState);
	}

	return next(action);
};

export default apiMiddleware;
