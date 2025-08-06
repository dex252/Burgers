import { useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { Modal } from '../../components/modals/shared/modal.jsx';
import { IngredientDetails } from '@components/modals/ingredient-details/ingredient-details';

import styles from './index.module.css';

export function IngedientsPage() {
	const { id } = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	const { ingredients } = useSelector((state) => state.IngredientsReducer);
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

	const closeModal = () => {
		navigate(-1);
	};

	return (
		<Modal header='Детали ингредиента' onClose={(e) => closeModal(e)}>
			{<IngredientDetails ingredient={ingredient} />}
		</Modal>
	);
}
