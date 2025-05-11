import React from 'react';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import { IngredientCategory } from '@components/ingredient-category/ingredient-category.jsx';

export const IngredientsSection = ({ ingredients }) => {
	const groupedIngredients = ingredients.reduce(
		(acc, ingredient) => {
			acc[ingredient.type].push(ingredient);
			return acc;
		},
		{ bun: [], sauce: [], main: [] }
	);

	return (
		<div className='ingridients-section'>
			<IngredientCategory
				title='Булки'
				ingredients={groupedIngredients.bun}
				type='bun'
			/>
			<IngredientCategory
				title='Соусы'
				ingredients={groupedIngredients.sauce}
				type='sauce'
			/>
			<IngredientCategory
				title='Начинки'
				ingredients={groupedIngredients.main}
				type='main'
			/>
		</div>
	);
};

IngredientsSection.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
