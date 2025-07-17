import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import {
	EmailInput,
	PasswordInput,
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Loader } from '../../../components/loader/loader';
import { useAuthActions } from '../../../services/store/slices/auth-slice';

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

	const onRegistration = async () => {
		let isSuccess = await register(emailValue, passwordValue, nameValue);
		if (!isSuccess) {
			return;
		}

		navigate('/login');
	};

	return (
		<section className={styles.content}>
			<Loader loading={loading}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
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
						htmlType='button'
						type='primary'
						size='large'
						onClick={onRegistration}
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
				</div>
			</Loader>
		</section>
	);
}
