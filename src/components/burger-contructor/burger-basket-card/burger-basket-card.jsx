import React from 'react';
import styles from './burger-basket-card.module.css';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import * as PropTypes from 'prop-types';
import { useBasketActions } from '../../../services/store/slices/basket-constructor-slice';

export const BurgerBasketCard = ({ ingredient, type }) => {
	const { removeFromBasket } = useBasketActions();
	const text =
		ingredient !== null
			? ingredient.name +
				(type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : '')
			: type !== undefined
				? 'Добавьте булки'
				: 'Добавьте начинку';

	const standardType = type === undefined;
	const hideDragIcon = !standardType ? `${styles.hide_drag_icon}` : '';

	const handleRemove = () => removeFromBasket(ingredient);

	return (
		<section className={`${styles.card} mt-4 mb-4`}>
			<DragIcon className={hideDragIcon}></DragIcon>
			{ingredient !== null ? (
				<ConstructorElement
					type={type}
					isLocked={!standardType}
					text={text}
					price={ingredient.price}
					alt={text}
					thumbnail={ingredient.image_mobile}
					handleClose={handleRemove}></ConstructorElement>
			) : (
				<div
					className={`constructor-element constructor-element_pos_${type} ${styles.empty_card}`}
					type={type}>
					<span>{text}</span>
				</div>
			)}
		</section>
	);
};

BurgerBasketCard.propTypes = {
	ingredient: ingredientPropType,
	type: PropTypes.oneOf(['top', 'bottom', undefined]),
};
