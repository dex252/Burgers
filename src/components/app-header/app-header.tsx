import { useAppSelector } from '@/utils/hooks';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
	Logo,
} from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import type { AuthReducerStates } from '@/utils/store-types';
import type { FC } from 'react';

import styles from './app-header.module.css';

export const AppHeader: FC = () => {
	const user = useAppSelector(
		(state: AuthReducerStates) => state.AuthReducer.user
	);

	return (
		<header className={styles.header}>
			<nav className={`${styles.menu} p-4`}>
				<div className={styles.menu_part_left}>
					{/*пока тут должны быть ссылки, а не например кнопки или абзацы*/}
					<Link to='/' className={`${styles.link} ${styles.link_active}`}>
						<BurgerIcon type='primary' />
						<p className='text text_type_main-default ml-2'>Конструктор</p>
					</Link>
					<Link to='/feed' className={`${styles.link} ml-10`}>
						<ListIcon type='secondary' />
						<p className='text text_type_main-default ml-2'>Лента заказов</p>
					</Link>
				</div>
				<div className={styles.logo}>
					<Logo />
				</div>
				<Link
					to='/profile'
					className={`${styles.link} ${styles.link_position_last}`}>
					<ProfileIcon type='secondary' />
					<p className='text text_type_main-default ml-2'>
						{user?.name ? `${user.name}` : 'Личный кабинет'}
					</p>
				</Link>
			</nav>
		</header>
	);
};
