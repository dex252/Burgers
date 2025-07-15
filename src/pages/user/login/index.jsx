import React, { useState } from 'react';
import styles from './index.module.css';
import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function LoginPage() {
	const [emailValue, setEmail] = useState('');
	const [passwordValue, setPassword] = useState('');

	const onChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};

	return (
		<section className={styles.content}>
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
					extraClass={`${styles.enter_button} mb-20`}>
					Войти
				</Button>
				<div className={`${styles.content_action} mb-4`}>
					<p className='text text_type_main-default'>
						Вы - новый пользователь?
					</p>
					<Button htmlType='button' type='secondary' size='medium'>
						Зарегестрироваться
					</Button>
				</div>
				<div className={styles.content_action}>
					<p className='text text_type_main-default'>Забыли пароль?</p>
					<Button htmlType='button' type='secondary' size='medium'>
						Восстановить пароль
					</Button>
				</div>
			</div>
		</section>
	);
}
