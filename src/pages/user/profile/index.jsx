import { useState } from 'react';
import styles from './index.module.css';
import {
	Input,
	EmailInput,
	Button,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ProfilePage() {
	const navButtons = {
		profile: 'profile',
		history: 'ordersHistory',
		exit: 'exit',
	};

	const [emailValue, setEmail] = useState('');
	const [passwordValue, setPassword] = useState('');
	const [nameValue, setName] = useState('');
	const [activeButton] = useState('profile');

	const onNavButtonClick = (e) => {
		console.info(e);
	};

	const onChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const onChangeName = (e) => {
		setName(e.target.value);
	};

	return (
		<div className={styles.container}>
			<div className={styles.content_wrapper}>
				<main className={`${styles.main} pl-5 pr-5`}>
					<div className={`${styles.content} pt-30`}>
						<div className={`${styles.content_column} pr-15`}>
							<Button
								htmlType='button'
								type='secondary'
								size='large'
								onClick={(e) => onNavButtonClick(e)}
								extraClass={`${styles.content_button} ${activeButton === navButtons.profile && styles.content_button_active}`}>
								<p className='text text_type_main-medium'>Профиль</p>
							</Button>
							<Button
								htmlType='button'
								type='secondary'
								size='large'
								onClick={(e) => onNavButtonClick(e)}
								extraClass={`${styles.content_button} ${activeButton === navButtons.history && styles.content_button_active}`}>
								<p className='text text_type_main-medium'>История заказов</p>
							</Button>
							<Button
								htmlType='button'
								type='secondary'
								size='large'
								onClick={(e) => onNavButtonClick(e)}
								extraClass={`${styles.content_button} ${activeButton === navButtons.exit && styles.content_button_active}`}>
								<p className='text text_type_main-medium'>Выход</p>
							</Button>
							<p
								className={`${styles.content_text} text text_type_main-default pt-20`}>
								В этом разделе вы можете изменить свои персональные данные
							</p>
						</div>
						<div className={styles.content_column}>
							<Input
								type={'text'}
								placeholder={'Имя'}
								onChange={onChangeName}
								value={nameValue}
								name={'name'}
								size={'default'}
								icon='EditIcon'
								extraClass='pb-6'
							/>
							<EmailInput
								onChange={onChangeEmail}
								value={emailValue}
								name={'email'}
								placeholder='Логин'
								isIcon={true}
								extraClass='pb-6'
							/>
							<PasswordInput
								onChange={onChangePassword}
								placeholder='Пароль'
								value={passwordValue}
								name={'password'}
								icon='EditIcon'
							/>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
