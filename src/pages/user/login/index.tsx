import { useAppSelector } from '@/utils/hooks';
import {
	EmailInput,
	PasswordInput,
	Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Loader } from '../../../components/loader/loader';
import { useAuthActions } from '../../../services/store/slices/auth-slice';

import type { AuthReducerStates } from '@/utils/store-types';
import type { FC, FormEvent } from 'react';

import styles from './index.module.css';

export const LoginPage: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { login } = useAuthActions();
	const { loading } = useAppSelector(
		(state: AuthReducerStates) => state.AuthReducer
	);
	const [emailValue, setEmail] = useState('');
	const [passwordValue, setPassword] = useState('');

	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		await onEnter();
	};

	const onEnter = async (): Promise<void> => {
		const isSuccess = await login(emailValue, passwordValue);
		if (!isSuccess) {
			return;
		}

		const from = location.state?.from || { pathname: '/' };

		navigate(from, { replace: true });
	};

	const onRegistration = (): void => {
		navigate('/register');
	};

	const onForgotPassword = (): void => {
		navigate('/forgot-password');
	};

	return (
		<section className={styles.content}>
			<Loader loading={loading}>
				<form onSubmit={handleSubmit} className={styles.content_form}>
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
						htmlType='submit'
						type='primary'
						size='large'
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
				</form>
			</Loader>
		</section>
	);
};
