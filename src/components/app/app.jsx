import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../../pages/home/index.jsx';
import { LoginPage } from '../../pages/user/login/index.jsx';
import { ForgotPasswordPage } from '../../pages/user/forgot-password/index.jsx';
import { ProfilePage } from '../../pages/user/profile/index.jsx';
import { RegisterPage } from '../../pages/user/register/index.jsx';
import { ResetPasswordPage } from '../../pages/user/reset-password/index.jsx';
import { IngedientsPage } from '../../pages/ingredients/index.jsx';
import { ErrorPage404 } from '../../pages/errors/404/index.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';
import styles from './app.module.css';

export const App = () => {
	return (
		<BrowserRouter>
			<div className={styles.app}>
				<AppHeader />
				<div className={styles.content}>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/login' element={<LoginPage />} />
						<Route path='/forgot-password' element={<ForgotPasswordPage />} />
						<Route path='/profile' element={<ProfilePage />} />
						<Route path='/register' element={<RegisterPage />} />
						<Route path='/reset-password' element={<ResetPasswordPage />} />
						<Route path='/ingredients/:id' element={<IngedientsPage />} />
						<Route path='*' element={<ErrorPage404 />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
};
