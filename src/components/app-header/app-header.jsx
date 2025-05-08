import styles from './app-header.module.css';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
	Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = () => {
	return (
		<header className={styles.header}>
			<nav className={`${styles.menu} p-4`}>
				<div className={styles.menu_part_left}>
					{/*пока тут должны быть ссылки, а не например кнопки или абзацы*/}
					<a href='/' className={`${styles.link} ${styles.link_active}`}>
						<BurgerIcon type='primary' />
						<p className='text text_type_main-default ml-2'>Конструктор</p>
					</a>
					<a href='/feed' className={`${styles.link} ml-10`}>
						<ListIcon type='secondary' />
						<p className='text text_type_main-default ml-2'>Лента заказов</p>
					</a>
				</div>
				<div className={styles.logo}>
					<Logo />
				</div>
				<a
					href='/profile'
					className={`${styles.link} ${styles.link_position_last}`}>
					<ProfileIcon type='secondary' />
					<p className='text text_type_main-default ml-2'>Личный кабинет</p>
				</a>
			</nav>
		</header>
	);
};
