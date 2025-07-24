import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Loader } from '../../../components/loader/loader';
import { useAuthActions } from '../../../services/store/slices/auth-slice';

export function ForgotPasswordPage() {
	const navigate = useNavigate();
	const { forgotPassword } = useAuthActions();
	const [emailValue, setEmail] = useState('');
	const { loading } = useSelector((state) => state.AuthReducer);

	const onChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await onRestore();
	};

	const onRestore = async () => {
		if (!emailValue) {
			return;
		}

		let isSuccess = await forgotPassword(emailValue);
		if (!isSuccess) {
			return;
		}

		navigate('/reset-password', { replace: true, state: { isAccess: true } });
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
					<EmailInput
						onChange={onChangeEmail}
						value={emailValue}
						name={'email'}
						placeholder='Укажите e-mail'
						isIcon={false}
						extraClass='pb-6'
					/>
					<Button
						htmlType='submit'
						type='primary'
						size='large'
						extraClass={`${styles.restore_button} mb-20`}>
						Восстановить
					</Button>
					<div className={`${styles.content_action} mb-4`}>
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
