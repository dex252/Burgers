import React, { useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { BurgerBasketCard } from './burger-basket-card/burger-basket-card';
import { OrderInfo } from './order-info/order-info';
import { useSelector } from 'react-redux';
import { useBasketActions } from '../../services/store/slices/basket-constructor-slice';
import { useDrop } from 'react-dnd';
import { useIngredientsActions } from '../../services/store/slices/ingredients-slice';

export const BurgerConstructor = () => {
	const bun = useSelector((state) => state.BasketReducer.bun);
	const ingredients = useSelector((state) => state.BasketReducer.ingredients);

	const { addInBasket, setBun } = useBasketActions();
	const { updateCount } = useIngredientsActions();

	const [{ isHover, dragItem }, dropTarget] = useDrop({
		accept: 'ingredient',
		collect: (monitor) => ({
			isHover: monitor.isOver(),
			dragItem: monitor.getItem(),
		}),
		drop(ingredient) {
			if (ingredient.type !== 'bun') {
				updateCount({ id: ingredient._id, delta: 1 });
				addInBasket(ingredient);
				return;
			}

			if (bun?._id == ingredient._id) {
				return;
			}

			if (bun != undefined) {
				updateCount({ id: bun._id, delta: -2 });
			}

			setBun(ingredient);
			updateCount({ id: ingredient._id, delta: 2 });
			return;
		},
	});

	const totalPrice = useMemo(() => {
		return (
			(bun ? Number(bun.price) * 2 : 0) +
			ingredients.reduce((sum, i) => sum + (Number(i.price) || 0), 0)
		);
	}, [bun, ingredients]);
	var isEmpty = ingredients.length === 0;

	const onHoverBun =
		isHover & (dragItem?.type === 'bun') ? `${styles.hovered}` : '';
	const onHoverOther =
		isHover & (dragItem?.type !== 'bun') ? `${styles.hovered}` : '';

	return (
		<section className={`${styles.burger_constructor} ml-4`} ref={dropTarget}>
			<div className={`${styles.basket_content} mb-10`}>
				<div className={onHoverBun}>
					<BurgerBasketCard ingredient={bun} type='top' />
				</div>
				<div className={`${styles.scroll_content} ${onHoverOther}`}>
					{isEmpty ? (
						<BurgerBasketCard ingredient={null} />
					) : (
						ingredients.map((ingredient) => (
							<BurgerBasketCard key={ingredient.guid} ingredient={ingredient} />
						))
					)}
				</div>
				<div className={onHoverBun}>
					<BurgerBasketCard ingredient={bun} type='bottom' />
				</div>
			</div>

			<OrderInfo price={totalPrice}></OrderInfo>
		</section>
	);
};
