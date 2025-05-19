import React from 'react';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import { IngredientCategory } from './ingredient-category/ingredient-category.jsx';
import styles from './ingredients-section.module.css';

export const IngredientsSection = ({ ingredients, openModal }) => {
	const groupedIngredients = ingredients.reduce(
		(acc, ingredient) => {
			acc[ingredient.type].push(ingredient);
			return acc;
		},
		{ bun: [], sauce: [], main: [] }
	);

	return (
		<section className={styles.ingredients_section}>
			<IngredientCategory
				title='Булки'
				ingredients={groupedIngredients.bun}
				type='bun'
				openModal={openModal}
			/>
			<IngredientCategory
				title='Соусы'
				ingredients={groupedIngredients.sauce}
				type='sauce'
				openModal={openModal}
			/>
			<IngredientCategory
				title='Начинки'
				ingredients={groupedIngredients.main}
				type='main'
				openModal={openModal}
			/>
		</section>
	);
};

IngredientsSection.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
