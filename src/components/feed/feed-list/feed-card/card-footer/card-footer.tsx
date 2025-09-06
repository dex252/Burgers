import { useAppSelector } from '@/utils/hooks';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useMemo, type ReactElement } from 'react';

import { CardImage } from './card-image/card-image';

import type { IngredientsReducerStates } from '@/utils/store-types';

import styles from './card-footer.module.css';

export const CardFooter = ({
	ingredients,
	id,
}: {
	ingredients: string[];
	id: string;
}): ReactElement => {
	const { ingredients: allIngredients } = useAppSelector(
		(state: IngredientsReducerStates) => state.IngredientsReducer
	);

	const ingredientDetails = ingredients
		.map((id) => {
			return allIngredients.find((ingredient) => ingredient._id === id);
		})
		.filter(Boolean);

	const MAX_VISIBLE_INGREDIENTS = 5;
	const visibleIngredients =
		ingredientDetails.length < MAX_VISIBLE_INGREDIENTS + 1
			? ingredientDetails
			: ingredientDetails.slice(0, MAX_VISIBLE_INGREDIENTS);

	const count =
		ingredientDetails.length > MAX_VISIBLE_INGREDIENTS + 1
			? ingredientDetails.length - MAX_VISIBLE_INGREDIENTS
			: 0;

	const price = useMemo(() => {
		return ingredientDetails.reduce(
			(sum, i) => sum + (Number(i?.price) || 0),
			0
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ingredients]);

	return (
		<section className={`ml-6 mb-6 ${styles.wrapper}`}>
			<div className={styles.container}>
				{visibleIngredients.map((ingredient, index) => (
					<div key={`${index}-${id}-${ingredient}`}>
						<CardImage
							src={ingredient?.image_mobile}
							alt={ingredient?.name}></CardImage>
					</div>
				))}
				{count > 0 && (
					<CardImage
						src={ingredientDetails[MAX_VISIBLE_INGREDIENTS]?.image_mobile}
						alt={ingredientDetails[MAX_VISIBLE_INGREDIENTS]?.name}
						darkened={true}
						text={`+${count}`}
					/>
				)}
			</div>

			{/* Иконка и текст справа */}
			<div className={styles.right_content}>
				<div className={`${styles.card_price} mb-1 mt-1`}>
					<p className='text text_type_digits-default'>{price}</p>
					<CurrencyIcon
						type='primary'
						className={`${styles.currency_icon} text text_type_digits-medium ml-6 mr-6`}
					/>
				</div>
			</div>
		</section>
	);
};
