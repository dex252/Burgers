import React from 'react';
import styles from './burger-constructor.module.css';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import { BurgerBasketCard } from '../burger-basket-card/burger-basket-card';
import { OrderInfo } from '../order-info/order-info';

export const BurgerConstructor = ({ ingredients }) => {
	console.log(ingredients);
	const bun = ingredients.find((e) => e.type === 'bun');
	const otherIngredients = ingredients.filter((e) => e.type !== 'bun');
	const totalPrice =
		otherIngredients.reduce((sum, ingredient) => {
			return sum + ingredient.price;
		}, 0) +
		bun.price * 2;

	return (
		<section className={`${styles.burger_constructor} ml-4`}>
			<div className={`${styles.basket_content} mb-10`}>
				<BurgerBasketCard key={bun._id} ingredient={bun} postfix='(верх)' />
				{otherIngredients.map(
					(ingredient) => (
						<BurgerBasketCard key={ingredient._id} ingredient={ingredient} />
					)
					//TODO: Ограничить в зависимости от числа добавленных ингредиентов?
					// А где это число хранится? В __v или требуется создать свою структуру для
					// продуктов в корзине? А как их туда добавить? В фигме нет образца для переключателей, свой придумать?
					// или на текущем этапе это не требуется?
					// ingredient.__v > 0 && (
					// 	<BurgerBasketCard key={ingredient._id} ingredient={ingredient} />
					// )
				)}
				<BurgerBasketCard key={bun._id} ingredient={bun} postfix='(низ)' />
			</div>
			<OrderInfo price={totalPrice}></OrderInfo>
		</section>
	);
};

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
