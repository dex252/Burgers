import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { IngredientsSection } from './ingredients-section/ingredients-section.jsx';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = () => {
	const [activeTab, setActiveTab] = useState('bun');
	const { ingredients } = useSelector((state) => state.IngredientsReducer);
	const setActiveCategory = (type) => {
		setActiveTab(type);
	};

	return (
		<section className={styles.burger_ingredients}>
			<nav className='mb-10'>
				<ul className={styles.menu}>
					<Tab value='bun' active={activeTab === 'bun'}>
						Булки
					</Tab>
					<Tab value='sauce' active={activeTab === 'sauce'}>
						Соусы
					</Tab>
					<Tab value='main' active={activeTab === 'main'}>
						Начинки
					</Tab>
				</ul>
			</nav>
			<IngredientsSection
				ingredients={ingredients}
				setActiveCategory={(type) =>
					setActiveCategory(type)
				}></IngredientsSection>
		</section>
	);
};
