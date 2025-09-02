import { ProfileNavigation } from '@/components/profile/profile-navigation/profile-navigation';
import {
	Input,
	EmailInput,
	Button,
	PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Loader } from '../../../components/loader/loader';
import { useAuthActions } from '../../../services/store/slices/auth-slice';

import type { AuthReducerStates } from '@/utils/store-types';
import type { FC, FormEvent } from 'react';

import styles from './index.module.css';

export const ProfilePage: FC = () => {
	const { changeUserData, getUserData } = useAuthActions();
	const { loading, user } = useSelector(
		(state: AuthReducerStates) => state.AuthReducer
	);
	const [emailValue, setEmail] = useState('');
	const [passwordValue, setPassword] = useState('');
	const [nameValue, setName] = useState('');

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		await onSave();
	};

	const onSave = async (): Promise<void> => {
		await changeUserData(nameValue, emailValue, passwordValue);
	};

	useEffect(() => {
		const fetchUserData = async (): Promise<void> => {
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onCancel = (): void => {
		if (user?.email) {
			setEmail(user.email);
		}
		if (user?.name) {
			setName(user.name);
		}
	};

	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setPassword(e.target.value);
	};

	const onChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setName(e.target.value);
	};

	return (
		<div className={styles.container}>
			<div className={styles.content_wrapper}>
				<main className={`${styles.main} pl-5 pr-5`}>
					<Loader loading={loading}>
						<div className={`${styles.content} pt-30`}>
							<ProfileNavigation />
							<form onSubmit={handleSubmit} className={styles.content_column}>
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
										onClick={() => onCancel()}>
										<p className='text text_type_main-medium'>Отмена</p>
									</Button>
									<Button htmlType='submit' size='medium'>
										<p className='text text_type_main-medium'>Сохранить</p>
									</Button>
								</div>
							</form>
						</div>
					</Loader>
				</main>
			</div>
		</div>
	);
};
