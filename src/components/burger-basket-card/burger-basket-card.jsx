import React from 'react';
import styles from './burger-basket-card.module.css';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	DragIcon,
	CurrencyIcon,
	LockIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerBasketCard = ({ ingredient }) => {
	console.log(ingredient);

	return (
		<section className={`${styles.card} mt-4 mb-4`}>
			<DragIcon type='primary' className={styles.move_button}></DragIcon>
			<div className={`${styles.card_content} ml-6`}>
				<img
					className='ml-4'
					src={ingredient.image_mobile}
					alt={ingredient.name}></img>
				<p className={`text text_type_main-small ${styles.text}`}>
					{ingredient.name}
				</p>
				<div className={`${styles.price} ml-5`}>
					<p className='text text_type_digits-default'>{ingredient.price}</p>
					<CurrencyIcon type='primary'></CurrencyIcon>
				</div>
				<div className={`${styles.ingredient_action} ml-5`}>
					{/* От чего зависит изображение иконки? Могут ли несколько одинаковых продуктов находиться в корзине? */}
					<LockIcon type='primary'></LockIcon>
				</div>
			</div>
		</section>
	);
};

BurgerBasketCard.propTypes = {
	ingredient: ingredientPropType.isRequired,
};
