import { useEffect, useRef } from 'react';

import { IngredientCategory } from './ingredient-category/ingredient-category.jsx';

import type { Ingredient, IngredientType } from '@/utils/prop-types-ts.js';
import type { ReactElement, RefObject } from 'react';

import styles from './ingredients-section.module.css';

type IngredientsSectionProps = {
	ingredients: Ingredient[];
	setActiveCategory(ingredientType: IngredientType): void;
};

type CategoryRefs = {
	bun: RefObject<HTMLDivElement | null>;
	sauce: RefObject<HTMLDivElement | null>;
	main: RefObject<HTMLDivElement | null>;
};

type GroupedIngredients = {
	bun: Ingredient[];
	sauce: Ingredient[];
	main: Ingredient[];
};

export const IngredientsSection = ({
	ingredients,
	setActiveCategory,
}: IngredientsSectionProps): ReactElement => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const categoryRefs: CategoryRefs = {
		bun: useRef<HTMLDivElement>(null),
		sauce: useRef<HTMLDivElement>(null),
		main: useRef<HTMLDivElement>(null),
	};

	const groupedIngredients: GroupedIngredients = {
		bun: ingredients.filter((e) => e.type === 'bun'),
		sauce: ingredients.filter((e) => e.type === 'sauce'),
		main: ingredients.filter((e) => e.type === 'main'),
	};

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) {
			return;
		}

		let lastActiveCategory: IngredientType = 'bun';
		let animationFrame: number | null = null;

		const handleScroll = (): void => {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}

			animationFrame = requestAnimationFrame(() => {
				const topSection = section.getBoundingClientRect().top;
				let activeCategory: IngredientType | null = null;
				let minDistance = Infinity;

				(
					Object.entries(categoryRefs) as [
						IngredientType,
						RefObject<HTMLDivElement>,
					][]
				).forEach(([type, ref]) => {
					if (!ref.current) return;

					const topCategory = ref.current.getBoundingClientRect().top;
					const distance = Math.abs(topCategory - topSection);

					if (distance < minDistance) {
						minDistance = distance;
						activeCategory = type;
					}
				});

				if (activeCategory && activeCategory !== lastActiveCategory) {
					lastActiveCategory = activeCategory;
					setActiveCategory(activeCategory);
				}
			});
		};

		section.addEventListener('scroll', handleScroll);

		handleScroll();

		return (): void => {
			section.removeEventListener('scroll', handleScroll);
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
			//console.info('UNMOUNT ingredients-section');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
