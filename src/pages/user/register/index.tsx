import { useAppSelector } from '@/utils/hooks';
import {
	EmailInput,
	PasswordInput,
	Button,
	Input,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loader } from '../../../components/loader/loader';
import { useAuthActions } from '../../../services/store/slices/auth-slice';

import type { AuthReducerStates } from '@/utils/store-types';
import type { FC, FormEvent } from 'react';

import styles from './index.module.css';

export const RegisterPage: FC = () => {
	const navigate = useNavigate();
	const { register } = useAuthActions();
	const [emailValue, setEmail] = useState('');
	const [passwordValue, setPassword] = useState('');
	const [nameValue, setName] = useState('');
	const { loading } = useAppSelector(
		(state: AuthReducerStates) => state.AuthReducer
	);

	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setPassword(e.target.value);
	};

	const onChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setName(e.target.value);
	};

	const onLogin = (): void => {
		navigate('/login');
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		await onRegistration();
	};

	const onRegistration = async (): Promise<void> => {
		const isSuccess = await register(emailValue, passwordValue, nameValue);
		if (!isSuccess) {
			return;
		}

		navigate('/');
	};

	return (
		<section className={styles.content}>
			<Loader loading={loading}>
				<form onSubmit={handleSubmit} className={styles.content_form}>
					<h1 className={`${styles.title} text text_type_main-medium pb-6`}>
						Регистрация
					</h1>
					<Input
						type={'text'}
						placeholder={'Имя'}
						onChange={onChangeName}
						value={nameValue}
						name={'name'}
						size={'default'}
						extraClass='pb-6'
					/>
					<EmailInput
						onChange={onChangeEmail}
						value={emailValue}
						name={'email'}
						placeholder='E-mail'
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
						extraClass={`${styles.register_button} mb-20`}>
						Зарегестрироваться
					</Button>
					<div className={`${styles.content_action} mb-4`}>
						<p className='text text_type_main-default text_color_inactive'>
							Уже зарегестрированы?
						</p>
						<Button
							htmlType='button'
							type='secondary'
							size='medium'
							onClick={onLogin}>
							Войти
						</Button>
					</div>
				</form>
			</Loader>
		</section>
	);
};
