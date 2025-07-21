import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Loader } from '../../../components/loader/loader';
import { useAuthActions } from '../../../services/store/slices/auth-slice';

export function LoginPage() {
	const navigate = useNavigate();
	const location = useLocation();

	const { login } = useAuthActions();
	const { loading } = useSelector((state) => state.AuthReducer);
	const [emailValue, setEmail] = useState('');
	const [passwordValue, setPassword] = useState('');

	const onChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const onEnter = async () => {
		let isSuccess = await login(emailValue, passwordValue);
		if (!isSuccess) {
			return;
		}

		const from = location.state?.from || { pathname: '/' };
		console.info(`Page login redirected to ${location.pathname}`);

		navigate(from, { replace: true });
	};

	const onRegistration = () => {
		navigate('/register');
	};

	const onForgotPassword = () => {
		navigate('/forgot-password');
	};

	return (
		<section className={styles.content}>
			<Loader loading={loading}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<h1 className={`${styles.title} text text_type_main-medium pb-6`}>
						Вход
					</h1>
					<EmailInput
						onChange={onChangeEmail}
						value={emailValue}
						name={'email'}
						placeholder='Email'
						isIcon={false}
						extraClass='pb-6'
					/>
					<PasswordInput
						onChange={onChangePassword}
						value={passwordValue}
						name={'password'}
						extraClass='pb-6'
					/>
					<Button
						htmlType='button'
						type='primary'
						size='large'
						onClick={onEnter}
						extraClass={`${styles.enter_button} mb-20`}>
						Войти
					</Button>
					<div className={`${styles.content_action} mb-4`}>
						<p className='text text_type_main-default text_color_inactive'>
							Вы - новый пользователь?
						</p>
						<Button
							htmlType='button'
							type='secondary'
							size='medium'
							onClick={onRegistration}>
							Зарегестрироваться
						</Button>
					</div>
					<div className={styles.content_action}>
						<p className='text text_type_main-default text_color_inactive'>
							Забыли пароль?
						</p>
						<Button
							htmlType='button'
							type='secondary'
							size='medium'
							onClick={onForgotPassword}>
							Восстановить пароль
						</Button>
					</div>
				</div>
			</Loader>
		</section>
	);
}
