import { IngredientCard } from '../ingredient-card/ingredient-card';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';

export const IngredientCategory = ({ title, ingredients, type }) => {
	return (
		<section className={`ingredient-category ingredient-category-${type}`}>
			<h2
				className={`ingredient-category-header ingredient-category-header-${type}`}>
				{title}
			</h2>
			<div
				className={`ingredient-category-content ingredient-category-content-${type}`}>
				{ingredients.map((ingredient) => (
					<IngredientCard ingredient={ingredient} />
				))}
			</div>
		</section>
	);
};

IngredientCategory.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
