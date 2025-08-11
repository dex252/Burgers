import { StateCard } from './state-card/state-card';

import type { FC } from 'react';

import type { Ingredient } from '@utils/prop-types-ts';

import styles from './ingredient-details.module.css';

type IngredientDetailsProps = {
	ingredient: Ingredient | null;
};

export const IngredientDetails: FC<IngredientDetailsProps> = ({
	ingredient,
}) => {
	if (!ingredient) {
		return null;
	}

	return (
		<section className={`${styles.container}`}>
			<img
				className={`pb-4 ${styles.img}`}
				src={ingredient.image_large}
				alt={ingredient.name}></img>
			<p className={`pb-8 ${styles.name} text text_type_main-medium`}>
				{ingredient.name}
			</p>
			<div className={`pb-15 ${styles.states}`}>
				<StateCard
					name='Каллории, ккал'
					count={ingredient.calories}></StateCard>
				<StateCard name='Белки, г' count={ingredient.proteins}></StateCard>
				<StateCard name='Жиры, г' count={ingredient.fat}></StateCard>
				<StateCard
					name='Углеводы, г'
					count={ingredient.carbohydrates}></StateCard>
			</div>
		</section>
	);
};
