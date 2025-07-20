import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import {
	Input,
	EmailInput,
	Button,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Loader } from '../../../components/loader/loader';
import { useAuthActions } from '../../../services/store/slices/auth-slice';

export function ProfilePage() {
	const navButtons = {
		profile: 'profile',
		history: 'ordersHistory',
		exit: 'exit',
	};
	const { changeUserData, getUserData } = useAuthActions();
	const { loading, user } = useSelector((state) => state.AuthReducer);
	const [emailValue, setEmail] = useState('');
	const [passwordValue, setPassword] = useState('');
	const [nameValue, setName] = useState('');
	const [activeButton] = useState('profile');

	const onSave = async () => {
		await changeUserData(nameValue, emailValue, passwordValue);
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const user = await getUserData(); // Ждем завершения запроса

				// После успешного получения данных обновляем состояние формы
				if (user?.email) {
					setEmail(user.email);
				}
				if (user?.name) {
					setName(user.name);
				}
			} catch (error) {
				console.error('Ошибка при загрузке данных пользователя:', error);
			}
		};

		fetchUserData();

		return () => {
			console.info('UNMOUNT Profile');
		};
	}, []);

	const onCancel = () => {
		if (user?.email) {
			setEmail(user.email);
		}
		if (user?.name) {
			setName(user.name);
		}
	};

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
					<Loader loading={loading}>
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
								<div className={`${styles.content_buttons_container} pt-6`}>
									<Button
										htmlType='button'
										size='medium'
										type='secondary'
										extraClass='mr-8'
										onClick={(e) => onCancel(e)}>
										<p className='text text_type_main-medium'>Отмена</p>
									</Button>
									<Button
										htmlType='button'
										size='medium'
										onClick={(e) => onSave(e)}>
										<p className='text text_type_main-medium'>Сохранить</p>
									</Button>
								</div>
							</div>
						</div>
					</Loader>
				</main>
			</div>
		</div>
	);
}
