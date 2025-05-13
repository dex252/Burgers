import React from 'react';
import styles from './burger-basket-card.module.css';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	DragIcon,
	CurrencyIcon,
	LockIcon,
	DeleteIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export const BurgerBasketCard = ({ ingredient, postfix = undefined }) => {
	console.log(ingredient);

	/**
	 * Тип ингредиента, не показываем drag-n-drop и блокируем возможность удалить ингредиент
	 */
	const isBunType = ingredient.type === 'bun';

	return (
		<section className={`${styles.card} mt-4 mb-4`}>
			<DragIcon
				type='primary'
				className={`${styles.move_button} ${isBunType && styles.hidden}`}></DragIcon>
			<div className={`${styles.card_content} ml-6`}>
				<img
					className='ml-4'
					src={ingredient.image_mobile}
					alt={ingredient.name}></img>
				<p className={`text text_type_main-small ${styles.text}`}>
					{ingredient.name}
					{postfix}
				</p>
				<div className={`${styles.price} ml-5`}>
					<p className='text text_type_digits-default'>{ingredient.price}</p>
					<CurrencyIcon type='primary'></CurrencyIcon>
				</div>
				<div className={`${styles.ingredient_action} ml-5`}>
					{/* От чего зависит изображение иконки кроме, как булки? Могут ли несколько одинаковых продуктов находиться в корзине? */}
					{isBunType ? (
						<LockIcon type='secondary'></LockIcon>
					) : (
						<DeleteIcon type='primary'></DeleteIcon>
					)}
				</div>
			</div>
		</section>
	);
};

BurgerBasketCard.propTypes = {
	ingredient: ingredientPropType.isRequired,
	postfix: PropTypes.string,
};
