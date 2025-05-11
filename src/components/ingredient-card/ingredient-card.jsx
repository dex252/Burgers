import { ingredientPropType } from '@utils/prop-types.js';

export const IngredientCard = ({ ingredient }) => {
	console.info(ingredient);
	return (
		<section
			key={ingredient._id}
			className={`ingredient-card ingredient-card-section-${ingredient.type}`}>
			<h1>{ingredient.name}</h1>
		</section>
	);
};

IngredientCard.propTypes = {
	ingredient: ingredientPropType.isRequired,
};
