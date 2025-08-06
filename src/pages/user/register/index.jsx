import {
	EmailInput,
	PasswordInput,
	Button,
	Input,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Loader } from '../../../components/loader/loader';
import { useAuthActions } from '../../../services/store/slices/auth-slice';

import styles from './index.module.css';

export function RegisterPage() {
	const navigate = useNavigate();
	const { register } = useAuthActions();
	const [emailValue, setEmail] = useState('');
	const [passwordValue, setPassword] = useState('');
	const [nameValue, setName] = useState('');
	const { loading } = useSelector((state) => state.AuthReducer);

	const onChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const onChangeName = (e) => {
		setName(e.target.value);
	};

	const onLogin = () => {
		navigate('/login');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await onRegistration();
	};

	const onRegistration = async () => {
		let isSuccess = await register(emailValue, passwordValue, nameValue);
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
}
