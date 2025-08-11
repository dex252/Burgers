import { forwardRef } from 'react';

import { IngredientCard } from './ingredient-card/ingredient-card';

import type { Ingredient, IngredientType } from '@/utils/prop-types-ts';

import styles from './ingredient-category.module.css';

type IngredientCategoryProps = {
	title: string;
	ingredients: Ingredient[];
	type: IngredientType;
};

export const IngredientCategory = forwardRef<
	HTMLDivElement,
	IngredientCategoryProps
>(({ title, ingredients, type }, ref) => {
	return (
		<section
			ref={ref}
			className={`ingredient-category ingredient-category-${type} mb-10`}>
			<h2
				className={`ingredient-category-header ingredient-category-header-${type} mb-6`}>
				{title}
			</h2>
			<div
				className={`${styles.ingredient_category_content} ingredient-category-content-${type} ml-4`}>
				{ingredients.map((ingredient) => (
					<IngredientCard key={ingredient._id} ingredient={ingredient} />
				))}
			</div>
		</section>
	);
});

IngredientCategory.displayName = 'IngredientCategory';
