import React from 'react';
import styles from './burger-basket-card.module.css';
import { ingredientPropType } from '@utils/prop-types.js';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import * as PropTypes from 'prop-types';

export const BurgerBasketCard = ({ ingredient, type }) => {
	const text =
		ingredient.name +
		(type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : '');

	return ingredient ? (
		<section className={`${styles.card} mt-4 mb-4`}>
			<ConstructorElement
				type={type}
				isLocked={type !== undefined && true}
				text={text}
				price={ingredient.price}
				alt={text}
				thumbnail={ingredient.image_mobile}></ConstructorElement>
		</section>
	) : null;
};

BurgerBasketCard.propTypes = {
	ingredient: ingredientPropType.isRequired,
	type: PropTypes.oneOf(['top', 'bottom', undefined]),
};
