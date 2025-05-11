import React from 'react';
import styles from './burger-constructor.module.css';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import { BurgerBasketCard } from '../burger-basket-card/burger-basket-card';
import { OrderInfo } from '../order-info/order-info';

export const BurgerConstructor = ({ ingredients }) => {
	console.log(ingredients);
	const totalPrice = ingredients.reduce((sum, ingredient) => {
		return sum + ingredient.price * ingredient.__v;
	}, 0);

	return (
		<section className={`${styles.burger_constructor} ml-4`}>
			<div className={`${styles.basket_content} mb-10`}>
				{ingredients.map(
					(ingredient) => (
						<BurgerBasketCard key={ingredient._id} ingredient={ingredient} />
					)
					//TODO: Ограничить в зависимости от числа компонентов? А где это число хранится? В __v или требуется создать свою структуру для
					//продуктов в корзине? А как их туда добавить? В фигме нет образца для переключателей, сво придумать?
					// ingredient.__v > 0 && (
					// 	<BurgerBasketCard key={ingredient._id} ingredient={ingredient} />
					// )
				)}
			</div>
			<OrderInfo price={totalPrice}></OrderInfo>
		</section>
	);
};

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
