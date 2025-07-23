import { React, useEffect, useRef } from 'react';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import { IngredientCategory } from './ingredient-category/ingredient-category.jsx';
import styles from './ingredients-section.module.css';

export const IngredientsSection = ({ ingredients, setActiveCategory }) => {
	const sectionRef = useRef(null);
	const categoryRefs = {
		bun: useRef(null),
		sauce: useRef(null),
		main: useRef(null),
	};
	const groupedIngredients = ingredients.reduce(
		(acc, ingredient) => {
			acc[ingredient.type].push(ingredient);
			return acc;
		},
		{ bun: [], sauce: [], main: [] }
	);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) {
			return;
		}

		let lastActiveCategory = 'bun';
		let animationFrame = null;

		const handleScroll = () => {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}

			animationFrame = requestAnimationFrame(() => {
				const topSection = section.getBoundingClientRect().top;
				let activeCategory = null;
				let minDistance = Infinity;

				for (const [type, ref] of Object.entries(categoryRefs)) {
					const topCategory = ref.current.getBoundingClientRect().top;
					const distance = Math.abs(topCategory - topSection);

					if (distance < minDistance) {
						minDistance = distance;
						activeCategory = type;
					}
				}

				if (activeCategory && activeCategory !== lastActiveCategory) {
					lastActiveCategory = activeCategory;
					setActiveCategory(activeCategory);
				}
			});
		};

		section.addEventListener('scroll', handleScroll);

		handleScroll();

		return () => {
			section.removeEventListener('scroll', handleScroll);
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
			console.info('UNMOUNT ingredients-section');
		};
	}, []);

	return (
		<section className={styles.ingredients_section} ref={sectionRef}>
			<IngredientCategory
				title='Булки'
				ingredients={groupedIngredients.bun}
				type='bun'
				ref={categoryRefs.bun}
			/>
			<IngredientCategory
				title='Соусы'
				ingredients={groupedIngredients.sauce}
				type='sauce'
				ref={categoryRefs.sauce}
			/>
			<IngredientCategory
				title='Начинки'
				ingredients={groupedIngredients.main}
				type='main'
				ref={categoryRefs.main}
			/>
		</section>
	);
};

IngredientsSection.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
	setActiveCategory: PropTypes.func.isRequired,
};
