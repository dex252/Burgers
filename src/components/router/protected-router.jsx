import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRouteElement = ({
	onlyAuth = false,
	onlyUnAuth = false,
	children,
}) => {
	const location = useLocation();
	const isAuthorization = useSelector(
		(state) => state.AuthReducer.isAuthorization
	);

	const { protectedRules, currentPath, currentValue } = useSelector(
		(state) => state.RouterRulesReducer
	);

	console.log('Защищенный маршрут:', {
		path: location.pathname,
		isAuthorization,
		onlyAuth,
		onlyUnAuth,
	});

	const from = location.state?.pathname || { pathname: '/' };

	const isRuleExist = protectedRules[location.pathname];
	console.info(isRuleExist);
	console.info(currentValue);
	console.info(currentPath);
	console.info(location.state?.pathname !== currentPath);
	if (isRuleExist && (!currentValue || isRuleExist !== currentPath)) {
		return <Navigate to={from} replace />;
	}

	//Требует авторизации и пользователь не авторизован
	if (onlyAuth && !isAuthorization) {
		const returnUrl = location.pathname;
		console.log(`Redirecting to login from ${returnUrl}`);
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	//Только для неавторизованных и пользователь авторизован
	if (onlyUnAuth && isAuthorization) {
		console.log(`Redirecting authorized user from ${location.pathname}`);
		return <Navigate to={from} replace />;
	}

	//Требуют авторизации и авторизован + не требуют авторизации и не авторизован
	console.log(`Redirecting any user from ${location.pathname}`);
	return children;
};

export const Protected = ProtectedRouteElement;
