import {
	ConstructorElement,
	DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';

import { useBasketActions } from '../../../services/store/slices/basket-constructor-slice';
import { useIngredientsActions } from '../../../services/store/slices/ingredients-slice';

import type { Ingredient, PositionType } from '@utils/prop-types-ts.ts';

import styles from './burger-basket-card.module.css';

export const BurgerBasketCard = ({
	ingredient,
	type,
}: {
	ingredient: Ingredient | null;
	type?: PositionType;
}): React.ReactElement => {
	const isBun = ingredient?.type === 'bun';
	const { removeFromBasket, sortIngredient } = useBasketActions();
	const { updateCount } = useIngredientsActions();

	const [, dragRef] = useDrag({
		type: 'basket',
		item: ingredient,
	});

	const [{ isHover, dragItem }, dropTarget] = useDrop<
		Ingredient,
		void,
		{ isHover: boolean; dragItem: Ingredient | undefined }
	>({
		accept: 'basket',
		collect: (monitor) => ({
			isHover: monitor.isOver(),
			dragItem: monitor.getItem(),
			clientOffset: monitor.getClientOffset(),
		}),
		drop(item) {
			sortIngredient({
				draggedGuid: item.guid,
				targetGuid: ingredient?.guid,
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

	const handleRemove = (): void => {
		if (ingredient == null) {
			return;
		}

		updateCount({ id: ingredient._id, delta: -1 });
		removeFromBasket(ingredient);
	};

	const onHover =
		isHover && dragItem?.type !== 'bun' && dragItem?.guid !== ingredient?.guid
			? `${styles.hovered}`
			: '';

	return (
		<section
			ref={isBun ? null : (dragRef as unknown as React.Ref<HTMLElement>)}>
			<div
				className={`${styles.card} mt-4 mb-4 ${onHover}`}
				data-test='ingredient-card-in-basket'
				ref={
					isBun ? null : (dropTarget as unknown as React.Ref<HTMLDivElement>)
				}>
				<DragIcon className={hideDragIcon} type={'primary'}></DragIcon>
				{ingredient !== null ? (
					<ConstructorElement
						type={type}
						isLocked={!standardType}
						text={text}
						price={ingredient.price}
						thumbnail={ingredient.image_mobile}
						handleClose={handleRemove}></ConstructorElement>
				) : (
					<div
						className={`constructor-element constructor-element_pos_${type} ${styles.empty_card}`}>
						{/* type={type}> */}
						<span>{text}</span>
					</div>
				)}
			</div>
		</section>
	);
};
