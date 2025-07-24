import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Loader } from '../../../components/loader/loader';
import { useAuthActions } from '../../../services/store/slices/auth-slice';

export function ResetPasswordPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { resetPassword } = useAuthActions();
	const { loading } = useSelector((state) => state.AuthReducer);
	const [codeValue, setCode] = useState('');
	const [passwordValue, setPassword] = useState('');
	//Доступ осуществляется со страницы forgot-password через передачу состояния в navigate
	const isAccess = location.state?.isAccess;

	useEffect(() => {
		if (!isAccess) {
			navigate('/');
		}
	}, []);

	const onChangeCode = (e) => {
		setCode(e.target.value);
	};

	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await onSave();
	};

	const onSave = async () => {
		let isSuccess = await resetPassword(passwordValue, codeValue);
		if (!isSuccess) {
			return;
		}

		navigate('/profile');
	};

	const onEnter = () => {
		navigate('/login');
	};

	return (
		<section className={styles.content}>
			<Loader loading={loading}>
				<form onSubmit={handleSubmit} className={styles.content_form}>
					<h1 className={`${styles.title} text text_type_main-medium pb-6`}>
						Восстановление пароля
					</h1>
					<PasswordInput
						onChange={onChangePassword}
						placeholder='Введите новый пароль'
						value={passwordValue}
						name={'password'}
						extraClass='pb-6'
					/>
					<Input
						type={'text'}
						placeholder={'Введите код из письма'}
						onChange={onChangeCode}
						value={codeValue}
						name={'name'}
						size={'default'}
						extraClass='pb-6'
					/>
					<Button
						htmlType='submit'
						type='primary'
						size='large'
						extraClass={`${styles.save_button} mb-20`}>
						Сохранить
					</Button>
					<div className={styles.content_action}>
						<p className='text text_type_main-default text_color_inactive'>
							Вспомнили пароль?
						</p>
						<Button
							htmlType='button'
							type='secondary'
							size='medium'
							onClick={onEnter}>
							Войти
						</Button>
					</div>
				</form>
			</Loader>
		</section>
	);
}
