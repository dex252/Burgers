import { React, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsSection } from './ingredients-section/ingredients-section.jsx';
import { useSelector } from 'react-redux';

export const BurgerIngredients = ({ openModal }) => {
	const [activeTab, setActiveTab] = useState('bun');
	const { ingredients } = useSelector((state) => state.IngredientsReducer);
	const setActiveCategory = (type) => {
		setActiveTab(type);
	};

	return (
		<section className={styles.burger_ingredients}>
			<nav className='mb-10'>
				<ul className={styles.menu}>
					<Tab value='bun' active={activeTab === 'bun'} onClick={() => {}}>
						Булки
					</Tab>
					<Tab value='sauce' active={activeTab === 'sauce'} onClick={() => {}}>
						Соусы
					</Tab>
					<Tab value='main' active={activeTab === 'main'} onClick={() => {}}>
						Начинки
					</Tab>
				</ul>
			</nav>
			<IngredientsSection
				ingredients={ingredients}
				openModal={(ingredient) => openModal(ingredient)}
				setActiveCategory={(type) =>
					setActiveCategory(type)
				}></IngredientsSection>
		</section>
	);
};
