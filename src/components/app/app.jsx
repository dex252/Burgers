import { React, useState, useEffect } from 'react';
import styles from './app.module.css';
import { Loader } from '../loader/loader.jsx';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { Modal } from '../modals/shared/modal.jsx';
import { IngredientDetails } from '../modals/ingredient-details/ingredient-details.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setIngredients } from '../../services/store/slices/ingredients-slice.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const App = () => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.IngredientsReducer);

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

	const closeModal = (e) => {
		console.info(e);
		setModalContent((prev) => ({ ...prev, isOpen: false }));
	};

	useEffect(() => {
		dispatch(setIngredients());
		return () => {
			console.info('UNMOUNT App');
		};
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
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients
							openModal={(ingredient) => openIngredientsDetail(ingredient)}
						/>
						<BurgerConstructor />
					</DndProvider>
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
