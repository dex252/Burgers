import { useSelector } from 'react-redux';

import { CardImage } from './card-image/card-image';

import type { IngredientsReducerStates } from '@/utils/store-types';
import type { ReactElement } from 'react';

import styles from './card-footer.module.css';

export const CardFooter = ({
	ingredients,
	id,
}: {
	ingredients: string[];
	id: string;
}): ReactElement => {
	const { ingredients: allIngredients } = useSelector(
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

	return (
		<section className={`ml-6 mb-6 ${styles.container}`}>
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
		</section>
	);
};
