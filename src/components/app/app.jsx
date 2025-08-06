import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ErrorPage404 } from '../../pages/errors/404/index.jsx';
import { HomePage } from '../../pages/home/index.jsx';
import { IngedientsPage } from '../../pages/ingredients/index.jsx';
import { ForgotPasswordPage } from '../../pages/user/forgot-password/index.jsx';
import { LoginPage } from '../../pages/user/login/index.jsx';
import { ProfilePage } from '../../pages/user/profile/index.jsx';
import { RegisterPage } from '../../pages/user/register/index.jsx';
import { ResetPasswordPage } from '../../pages/user/reset-password/index.jsx';
import { useAuthActions } from '../../services/store/slices/auth-slice.jsx';
import { Protected } from '../router/protected-router.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';

import styles from './app.module.css';

export const App = () => {
	const { setAuthorization } = useAuthActions();

	useEffect(() => {
		setAuthorization();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<BrowserRouter>
			<div className={styles.app}>
				<AppHeader />
				<div className={styles.content}>
					<Routes>
						<Route path='/' element={<Protected>{<HomePage />}</Protected>}>
							<Route path='ingredient/:id' element={<IngedientsPage />} />
						</Route>
						<Route
							path='/login'
							element={<Protected onlyUnAuth>{<LoginPage />}</Protected>}
						/>
						<Route
							path='/forgot-password'
							element={
								<Protected onlyUnAuth>{<ForgotPasswordPage />}</Protected>
							}
						/>
						<Route
							path='/profile'
							element={<Protected onlyAuth>{<ProfilePage />}</Protected>}
						/>
						<Route
							path='/register'
							element={<Protected onlyUnAuth>{<RegisterPage />}</Protected>}
						/>
						<Route
							path='/reset-password'
							element={
								<Protected onlyUnAuth>{<ResetPasswordPage />}</Protected>
							}
						/>
						<Route path='*' element={<ErrorPage404 />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
};
