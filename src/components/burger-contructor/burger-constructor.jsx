import React from 'react';
import styles from './burger-constructor.module.css';
import * as PropTypes from 'prop-types';
import { BurgerBasketCard } from './burger-basket-card/burger-basket-card';
import { OrderInfo } from './order-info/order-info';
import { useSelector } from 'react-redux';

export const BurgerConstructor = ({ createOrder }) => {
	const bun = useSelector((state) => state.BasketReducer.bun);
	const ingredients = useSelector((state) => state.BasketReducer.ingredients);

	const totalPrice =
		(bun ? Number(bun.price) * 2 : 0) +
		ingredients.reduce((sum, i) => sum + (Number(i.price) || 0), 0);
	var isEmpty = ingredients.length === 0;

	return (
		<section className={`${styles.burger_constructor} ml-4`}>
			<div className={`${styles.basket_content} mb-10`}>
				<BurgerBasketCard ingredient={bun} type='top' />
				{isEmpty ? (
					<BurgerBasketCard ingredient={null} />
				) : (
					<div className={`${styles.scroll_content}`}>
						{ingredients.map((ingredient) => (
							<BurgerBasketCard key={ingredient._id} ingredient={ingredient} />
						))}
					</div>
				)}

				<BurgerBasketCard ingredient={bun} type='bottom' />
			</div>

			<OrderInfo price={totalPrice} createOrder={createOrder}></OrderInfo>
		</section>
	);
};

BurgerConstructor.propTypes = {
	createOrder: PropTypes.func,
};
