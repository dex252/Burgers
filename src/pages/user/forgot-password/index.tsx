import { useAppSelector } from '@/utils/hooks';
import {
	EmailInput,
	Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loader } from '../../../components/loader/loader';
import { useAuthActions } from '../../../services/store/slices/auth-slice';

import type { AuthReducerStates } from '@/utils/store-types';
import type { FC, FormEvent } from 'react';

import styles from './index.module.css';

export const ForgotPasswordPage: FC = () => {
	const navigate = useNavigate();
	const { forgotPassword } = useAuthActions();
	const [emailValue, setEmail] = useState('');
	const { loading } = useAppSelector(
		(state: AuthReducerStates) => state.AuthReducer
	);

	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		await onRestore();
	};

	const onRestore = async (): Promise<void> => {
		if (!emailValue) {
			return;
		}

		const isSuccess = await forgotPassword(emailValue);
		if (!isSuccess) {
			return;
		}

		navigate('/reset-password', { replace: true, state: { isAccess: true } });
	};

	const onEnter = (): void => {
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
};
