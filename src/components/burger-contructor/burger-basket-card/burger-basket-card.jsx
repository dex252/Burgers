import React from 'react';
import styles from './burger-basket-card.module.css';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import * as PropTypes from 'prop-types';
import { useBasketActions } from '../../../services/store/slices/basket-constructor-slice';
import { useDrag, useDrop } from 'react-dnd';
import { useIngredientsActions } from '../../../services/store/slices/ingredients-slice';

export const BurgerBasketCard = ({ ingredient, type }) => {
	const isBun = ingredient?.type === 'bun';
	const { removeFromBasket, sortIngredient } = useBasketActions();
	const { updateCount } = useIngredientsActions();

	const [, dragRef] = useDrag({
		type: 'basket',
		item: ingredient,
	});

	const [{ isHover, dragItem }, dropTarget] = useDrop({
		accept: 'basket',
		collect: (monitor) => ({
			isHover: monitor.isOver(),
			dragItem: monitor.getItem(),
			clientOffset: monitor.getClientOffset(),
		}),
		drop(item) {
			sortIngredient({
				draggedGuid: item.guid,
				targetGuid: ingredient.guid,
			});
		},
	});

	const text =
		ingredient !== null
			? ingredient.name +
				(type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : '')
			: type !== undefined
				? 'Добавьте булки'
				: 'Добавьте начинку';

	const standardType = type === undefined;
	const hideDragIcon = !standardType ? `${styles.hide_drag_icon}` : '';

	const handleRemove = () => {
		updateCount({ id: ingredient._id, delta: -1 });
		removeFromBasket(ingredient);
	};

	const onHover =
		isHover & (dragItem?.type !== 'bun') & (dragItem?.guid !== ingredient?.guid)
			? `${styles.hovered}`
			: '';

	return (
		<section ref={isBun ? null : dragRef}>
			<div
				className={`${styles.card} mt-4 mb-4 ${onHover}`}
				ref={isBun ? null : dropTarget}>
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
			</div>
		</section>
	);
};

BurgerBasketCard.propTypes = {
	ingredient: ingredientPropType,
	type: PropTypes.oneOf(['top', 'bottom', undefined]),
};
