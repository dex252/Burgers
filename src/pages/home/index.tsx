import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import { Loader } from '../../components/loader/loader';
import { setIngredients } from '../../services/store/slices/ingredients-slice.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';

import type { FC } from 'react';

import type {
	AppDispatch,
	IngredientsReducerStates,
} from '../../utils/store-types';

import styles from './index.module.css';

export const HomePage: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const location = useLocation();
	const isDefault = location.pathname == '/';
	const backgroundLocation = location.state?.backgroundLocation;

	const { loading, ingredients } = useSelector(
		(state: IngredientsReducerStates) => state.IngredientsReducer
	);

	useEffect(() => {
		if (ingredients && ingredients.length > 0) {
			return;
		}

		dispatch(setIngredients());
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
};
