import { React, useEffect } from 'react';
import styles from './index.module.css';
import { Loader } from '../../components/loader/loader.jsx';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setIngredients } from '../../services/store/slices/ingredients-slice.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Outlet, useLocation } from 'react-router-dom';

export function HomePage() {
	const dispatch = useDispatch();
	const location = useLocation();
	const isDefault = location.pathname == '/';
	const backgroundLocation = location.state?.backgroundLocation;

	const { loading, ingredients } = useSelector(
		(state) => state.IngredientsReducer
	);

	useEffect(() => {
		if (ingredients && ingredients.length > 0) {
			return;
		}

		dispatch(setIngredients());
		return () => {
			//console.info('UNMOUNT App');
		};
	}, []);

	//Страница не является дефолтной и не является модальным окном
	if (!isDefault && !backgroundLocation) {
		return <Outlet />;
	}

	return (
		<div className={styles.container}>
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mr-5 pl-5`}>
				Соберите бургер
			</h1>
			<div className={styles.content_wrapper}>
				<main className={`${styles.main} pl-5 pr-5`}>
					<Loader loading={loading}>
						<DndProvider backend={HTML5Backend}>
							<BurgerIngredients />
							<BurgerConstructor />
						</DndProvider>
					</Loader>
				</main>
			</div>
			<Outlet />
		</div>
	);
}
