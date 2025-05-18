import { IngredientCard } from '../ingredient-card/ingredient-card';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import styles from './ingredient-category.module.css';

export const IngredientCategory = ({ title, ingredients, type, openModal }) => {
	return (
		<section
			className={`ingredient-category ingredient-category-${type} mb-10`}>
			<h2
				className={`ingredient-category-header ingredient-category-header-${type} mb-6`}>
				{title}
			</h2>
			<div
				className={`${styles.ingredient_category_content} ingredient-category-content-${type} ml-4`}>
				{ingredients.map((ingredient) => (
					<IngredientCard
						key={ingredient._id}
						ingredient={ingredient}
						openModal={openModal}
					/>
				))}
			</div>
		</section>
	);
};

IngredientCategory.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
