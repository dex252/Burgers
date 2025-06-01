import { React, useState, useEffect } from 'react';
import styles from './app.module.css';
import { Loader } from '../loader/loader.jsx';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';
import {
	request,
	GET_INGREDIENTS,
	GET_ORDER,
} from '../../services/api/yandex_api.jsx';
import { Modal } from '../modals/shared/modal.jsx';
import { IngredientDetails } from '../modals/ingredient-details/ingredient-details.jsx';
import { CreateOrder } from '../modals/create-order/create-order.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useIngredientsActions } from '../../services/store/slices/ingredients-slice.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const App = () => {
	const dispatch = useDispatch();
	const { setIngredients } = useIngredientsActions();
	const ingredients = useSelector(
		(state) => state.IngredientsReducer.ingredients
	);

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
		const getOrderNumber = async () => {
			const basketContent = [];
			ingredients.forEach((item) => {
				if (item?.count > 0) {
					for (let i = 0; i < item.count; i++) {
						basketContent.push(item._id);
					}
				}
			});
			try {
				var response = await request(GET_ORDER, 'post', {
					ingredients: basketContent,
				});
				setModalContent({
					header: '',
					content: <CreateOrder orderNumber={response.order.number} />,
					isOpen: true,
				});
			} catch (error) {
				setModalContent({
					header: '',
					content: (
						<Loader
							loading={{
								isSpinner: false,
								isErrorMessage: error.message,
								isError: true,
							}}
						/>
					),
					isOpen: true,
				});
			}
		};

		setModalContent({
			header: '',
			content: <Loader loading={{ isSpinner: true }} />,
			isOpen: true,
		});

		dispatch(getOrderNumber);
	};

	const closeModal = (e) => {
		console.info(e);
		setModalContent((prev) => ({ ...prev, isOpen: false }));
	};

	useEffect(() => {
		const failed = (error) => {
			setLoading({
				isError: true,
				isSpinner: false,
				isErrorMessage: error.message,
			});
		};

		const success = (response) => {
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
		};

		const getIngredients = async () => {
			setLoading({ isError: false, isSpinner: true });
			try {
				var response = await request(GET_INGREDIENTS);
				success(response);
			} catch (error) {
				failed(error);
			}
		};

		dispatch(getIngredients);
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
							ingredients={ingredients}
							openModal={(ingredient) => openIngredientsDetail(ingredient)}
						/>
						<BurgerConstructor createOrder={() => createOrder()} />
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
