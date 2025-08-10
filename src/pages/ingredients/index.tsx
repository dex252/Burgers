import { useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { Modal } from '../../components/modals/shared/modal.jsx';
import { IngredientDetails } from '@components/modals/ingredient-details/ingredient-details';

import type { FC } from 'react';

import type { IngredientsReducerStates } from '../../utils/store-types';

import styles from './index.module.css';

export const IngedientsPage: FC = () => {
	const { id } = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	const { ingredients } = useSelector(
		(state: IngredientsReducerStates) => state.IngredientsReducer
	);
	const ingredient = ingredients.find((item) => item._id === id);

	const backgroundLocation = location.state?.backgroundLocation;

	if (!ingredient) {
		return null;
	}

	if (!backgroundLocation) {
		// Прямой переход по URL - показываем полную страницу
		return (
			<div className={`${styles.container} p-10`}>
				<div className={`${styles.content}`}>
					<div className='page-container'>
						<h1 className='text text_type_main-large'>Детали ингредиента</h1>
						<IngredientDetails ingredient={ingredient} />
					</div>
				</div>
			</div>
		);
	}

	const closeModal = (): void => {
		navigate(-1);
	};

	return (
		<Modal header='Детали ингредиента' onClose={() => closeModal()}>
			{<IngredientDetails ingredient={ingredient} />}
		</Modal>
	);
};
