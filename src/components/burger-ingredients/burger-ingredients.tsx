import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { IngredientsSection } from './ingredients-section/ingredients-section';

import type { IngredientType } from '@/utils/prop-types-ts';
import type { IngredientsReducerStates } from '@/utils/store-types.js';
import type { ReactElement } from 'react';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): ReactElement => {
	const [activeTab, setActiveTab] = useState('bun');
	const { ingredients } = useSelector(
		(state: IngredientsReducerStates) => state.IngredientsReducer
	);
	const setActiveCategory = (type: IngredientType): void => {
		setActiveTab(type);
	};

	return (
		<section className={styles.burger_ingredients}>
			<nav className='mb-10'>
				<ul className={styles.menu}>
					<Tab
						value='bun'
						active={activeTab === 'bun'}
						onClick={(): void => undefined}>
						Булки
					</Tab>
					<Tab
						value='sauce'
						active={activeTab === 'sauce'}
						onClick={(): void => undefined}>
						Соусы
					</Tab>
					<Tab
						value='main'
						active={activeTab === 'main'}
						onClick={(): void => undefined}>
						Начинки
					</Tab>
				</ul>
			</nav>
			<IngredientsSection
				ingredients={ingredients}
				setActiveCategory={(type: IngredientType) =>
					setActiveCategory(type)
				}></IngredientsSection>
		</section>
	);
};
