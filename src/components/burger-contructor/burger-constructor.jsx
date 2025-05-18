import React from 'react';
import styles from './burger-constructor.module.css';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import { BurgerBasketCard } from './burger-basket-card/burger-basket-card';
import { OrderInfo } from '../order-info/order-info';

export const BurgerConstructor = ({ ingredients }) => {
	const bun = ingredients.find((e) => e.type === 'bun');
	const otherIngredients = ingredients.filter((e) => e.type !== 'bun');
	const totalPrice =
		(bun ? Number(bun.price) * 2 : 0) +
		otherIngredients.reduce((sum, i) => sum + (Number(i.price) || 0), 0);

	return (
		<section className={`${styles.burger_constructor} ml-4`}>
			<div className={`${styles.basket_content} mb-10`}>
				{bun !== undefined && <BurgerBasketCard ingredient={bun} type='top' />}
				<div className={`${styles.scroll_content}`}>
					{otherIngredients.map((ingredient) => (
						<BurgerBasketCard key={ingredient._id} ingredient={ingredient} />
					))}
				</div>
				{bun !== undefined && (
					<BurgerBasketCard ingredient={bun} type='bottom' />
				)}
			</div>

			<OrderInfo price={totalPrice}></OrderInfo>
		</section>
	);
};

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
