import { FeedDetails } from '@/components/feed/feed-details/feed-details';
import { FeedList } from '@/components/feed/feed-list/feed-container';
import { setIngredients } from '@/services/store/slices/ingredients-slice';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { useEffect, type FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Loader } from '../../components/loader/loader';
import { ordersFeedWsActions } from '../../services/store/slices/orders-feed-slice';

import type {
	IngredientsReducerStates,
	OrdersFeedReducerStates,
} from '@/utils/store-types';

import styles from './index.module.css';

export const FeedPage: FC = () => {
	const GET_ALL_ORDERS = 'wss://norma.nomoreparties.space/orders/all';
	const dispatch = useAppDispatch();
	const location = useLocation();
	const isDefault = location.pathname === '/feed';
	const backgroundLocation = location.state?.backgroundLocation;

	const { orders, loading, total, totalToday } = useAppSelector(
		(state: OrdersFeedReducerStates) => state.OrdersFeedReducer
	);

	const { ingredients } = useAppSelector(
		(state: IngredientsReducerStates) => state.IngredientsReducer
	);

	useEffect(() => {
		if (!ingredients || ingredients.length === 0) {
			dispatch(setIngredients());
		}

		dispatch(ordersFeedWsActions.connect(GET_ALL_ORDERS));
		return (): void => {
			dispatch(ordersFeedWsActions.disconnect());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!isDefault && !backgroundLocation) {
		return <Outlet />;
	}
	return (
		<section className={styles.container}>
			<div className={styles.loader_container}>
				<Loader loading={loading}>
					<main className={`${styles.main} pl-5 pr-5`}>
						<FeedList orders={orders}></FeedList>
						<FeedDetails
							orders={orders}
							total={total}
							totalToday={totalToday}></FeedDetails>
					</main>
				</Loader>
			</div>
			<Outlet />
		</section>
	);
};
