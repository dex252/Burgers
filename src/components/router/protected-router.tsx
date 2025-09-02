import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

import type { AuthReducerStates } from '@/utils/store-types';
import type { FC, ReactNode } from 'react';

type IProtectedProps = {
	onlyAuth?: boolean;
	onlyUnAuth?: boolean;
	children: ReactNode;
};

const ProtectedRouteElement: FC<IProtectedProps> = ({
	onlyAuth = false,
	onlyUnAuth = false,
	children,
}) => {
	const location = useLocation();
	const { isAuthorization, isLoadingAuthorization } = useSelector(
		(state: AuthReducerStates) => state.AuthReducer
	);

	if (isLoadingAuthorization) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					gap: '20px',
				}}>
				<MoonLoader color='#8585AD' size={120} />
			</div>
		);
	}

	// console.log('Защищенный маршрут:', {
	// 	path: location.pathname,
	// 	isAuthorization,
	// 	onlyAuth,
	// 	onlyUnAuth,
	// });

	const from = location.state?.pathname || { pathname: '/' };

	//Требует авторизации и пользователь не авторизован
	if (onlyAuth && !isAuthorization) {
		//console.log(`Redirecting to login from ${location.pathname}`);
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	//Только для неавторизованных и пользователь авторизован
	if (onlyUnAuth && isAuthorization) {
		//console.log(`Redirecting authorized user from ${location.pathname}`);
		return <Navigate to={from} replace />;
	}

	//Требуют авторизации и авторизован + не требуют авторизации и не авторизован
	//console.log(`Redirecting any user from ${location.pathname}`);
	return children;
};

export const Protected = ProtectedRouteElement;
