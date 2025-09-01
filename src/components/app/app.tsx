import { OrderDetailsPage } from '@/pages/order-details';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ErrorPage404 } from '../../pages/errors/404/index';
import { FeedPage } from '../../pages/feed/index';
import { HomePage } from '../../pages/home/index';
import { IngedientsPage } from '../../pages/ingredients/index';
import { ForgotPasswordPage } from '../../pages/user/forgot-password/index';
import { LoginPage } from '../../pages/user/login/index';
import { ProfilePage } from '../../pages/user/profile/index';
import { RegisterPage } from '../../pages/user/register/index';
import { ResetPasswordPage } from '../../pages/user/reset-password/index';
import { useAuthActions } from '../../services/store/slices/auth-slice';
import { Protected } from '../router/protected-router';
import { AppHeader } from '@components/app-header/app-header';

import type { FC } from 'react';

import styles from './app.module.css';

export const App: FC = () => {
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
						<Route path='/feed' element={<Protected>{<FeedPage />}</Protected>}>
							<Route path=':number' element={<OrderDetailsPage />} />
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
