import { React, useState, useEffect } from 'react';
import styles from './app.module.css';
//import { ingredients } from '@utils/ingredients.js';
import { Loader } from '../loader/loader.jsx';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { getIngredients } from '../../services/yandex_api.jsx';
import { Modal } from '../modals/shared/modal.jsx';
import { IngredientDetails } from '../modals/ingredient-details/ingredient-details.jsx';
import { CreateOrder } from '../modals/create-order/create-order.jsx';

export const App = () => {
	const [ingredients, setIngredients] = useState([]);
	const [loading, setLoading] = useState({
		isError: false,
		isErrorMessage: undefined,
		isSpinner: false,
	});

	const [modalContent, setModalContent] = useState({
		header: null,
		content: null,
		isOpen: false,
	});

	const openIngredientsDetail = (ingredient) => {
		setModalContent({
			header: 'Детали ингредиента',
			content: <IngredientDetails ingredient={ingredient} />,
			isOpen: true,
		});
	};

	const createOrder = () => {
		setModalContent({
			header: '',
			content: <CreateOrder orderNumber='034536' />,
			isOpen: true,
		});
	};

	const closeModal = (e) => {
		console.info(e);
		setModalContent((prev) => ({ ...prev, isOpen: false }));
	};

	useEffect(() => {
		const ingredients = async () => {
			try {
				setLoading({ isError: false, isSpinner: true });
				const response = await getIngredients();
				if (!response.success) {
					setLoading({
						isError: true,
						isSpinner: false,
						isErrorMessage: response.data,
					});

					setIngredients([]);
					return;
				}

				setLoading({
					isError: false,
					isSpinner: false,
					isErrorMessage: undefined,
				});

				setIngredients(response.data);
			} catch (error) {
				setLoading({
					isError: true,
					isSpinner: false,
					isErrorMessage: error.message,
				});
			}
		};
		ingredients();
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mr-5 pl-5`}>
				Соберите бургер
			</h1>
			<main className={`${styles.main} pl-5 pr-5`}>
				<Loader loading={loading}>
					<BurgerIngredients
						ingredients={ingredients}
						openModal={(ingredient) => openIngredientsDetail(ingredient)}
					/>
					<BurgerConstructor
						ingredients={ingredients}
						createOrder={() => createOrder()}
					/>
				</Loader>
			</main>

			{modalContent.isOpen && (
				<Modal header={modalContent.header} onClose={(e) => closeModal(e)}>
					{modalContent.content}
				</Modal>
			)}
		</div>
	);
};
