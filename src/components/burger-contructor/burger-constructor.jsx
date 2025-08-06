import { useEffect, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';

import { useAuthActions } from '../../services/store/slices/auth-slice';
import { useBasketActions } from '../../services/store/slices/basket-constructor-slice';
import { useIngredientsActions } from '../../services/store/slices/ingredients-slice';
import { BurgerBasketCard } from './burger-basket-card/burger-basket-card';
import { OrderInfo } from './order-info/order-info';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
	const bun = useSelector((state) => state.BasketReducer.bun);
	const ingredients = useSelector((state) => state.BasketReducer.ingredients);
	const isChange = useSelector((state) => state.OrderReducer.isChange);
	const isLogout = useSelector((state) => state.AuthReducer.isLogout);

	const { addInBasket, setBun, clearBasket } = useBasketActions();
	const { updateCount, clearCounts } = useIngredientsActions();
	const { setLogout } = useAuthActions();

	const [{ isHover, dragItem }, dropTarget] = useDrop({
		accept: 'ingredient',
		collect: (monitor) => ({
			isHover: monitor.isOver(),
			dragItem: monitor.getItem(),
		}),
		drop(ingredient) {
			if (ingredient.type !== 'bun') {
				updateCount({ id: ingredient._id, delta: 1 });
				const guid =
					Date.now().toString(36) + Math.random().toString(36).substring(2);
				const index = ingredients.length;
				addInBasket({ ingredient, guid, index });
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

	useEffect(() => {
		//Если случилось разлогирование, то не чистим корзину
		if (isLogout === true) {
			//После первой попытки - можно чистить
			setLogout(false);
			return;
		}

		clearBasket();
		clearCounts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isChange]);

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
