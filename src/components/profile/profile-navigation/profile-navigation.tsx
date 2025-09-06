import { useAuthActions } from '@/services/store/slices/auth-slice';
import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router-dom';

import type { ReactElement } from 'react';

import styles from './profile-navigation.module.css';

export const ProfileNavigation = (): ReactElement => {
	const navigate = useNavigate();
	const location = useLocation();
	const currentLocation = location.pathname;

	const navButtons = {
		profile: '/profile',
		history: '/profile/orders',
	};

	const { userLogout } = useAuthActions();

	const onUserLogout = async (): Promise<void> => {
		await userLogout();
	};

	const text =
		currentLocation === navButtons.profile
			? 'В этом разделе вы можете изменить свои персональные данные'
			: currentLocation === navButtons.history
				? 'В этом разделе вы можете просмотреть свою историю заказов'
				: '';

	const onProfileButton = (): void => {
		if (currentLocation === navButtons.profile) {
			return;
		}

		navigate(`${navButtons.profile}`, {
			state: { backgroundLocation: location },
		});
	};

	const onOrdersButton = (): void => {
		if (currentLocation === navButtons.history) {
			return;
		}

		navigate(`${navButtons.profile}/orders`, {
			state: { backgroundLocation: location },
		});
	};

	return (
		<section className={`${styles.content_column} pr-15`}>
			<Button
				htmlType='button'
				type='secondary'
				size='large'
				onClick={onProfileButton}
				extraClass={`${styles.content_button} ${currentLocation === navButtons.profile && styles.content_button_active}`}>
				<p className='text text_type_main-medium'>Профиль</p>
			</Button>
			<Button
				htmlType='button'
				type='secondary'
				size='large'
				onClick={onOrdersButton}
				extraClass={`${styles.content_button} ${currentLocation === navButtons.history && styles.content_button_active}`}>
				<p className='text text_type_main-medium'>История заказов</p>
			</Button>
			<Button
				htmlType='button'
				type='secondary'
				size='large'
				onClick={() => onUserLogout()}
				extraClass={`${styles.content_button}`}>
				<p className='text text_type_main-medium'>Выход</p>
			</Button>
			<p className={`${styles.content_text} text text_type_main-default pt-20`}>
				{text}
			</p>
		</section>
	);
};
