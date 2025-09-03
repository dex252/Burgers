import { FeedList } from '@/components/feed/feed-list/feed-container';
import { Loader } from '@/components/loader/loader';
import { ProfileNavigation } from '@/components/profile/profile-navigation/profile-navigation';
import { setIngredients } from '@/services/store/slices/ingredients-slice';
import { ordersHistoryWsActions } from '@/services/store/slices/orders-history-slice';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import type {
	IngredientsReducerStates,
	OrdersHistoryReducerStates,
} from '@/utils/store-types';
import type { FC } from 'react';

import styles from './index.module.css';

export const OrdersHistoryPage: FC = () => {
	const GET_ALL_HISTORY_ORDERS = 'wss://norma.nomoreparties.space/orders';
	const dispatch = useAppDispatch();

	const location = useLocation();
	const isDefault = location.pathname === '/profile/orders';
	const backgroundLocation = location.state?.backgroundLocation;

	const { orders, loading } = useAppSelector(
		(state: OrdersHistoryReducerStates) => state.OrdersHistoryReducer
	);

	const { ingredients } = useAppSelector(
		(state: IngredientsReducerStates) => state.IngredientsReducer
	);

	useEffect(() => {
		if (!ingredients || ingredients.length === 0) {
			dispatch(setIngredients());
		}

		dispatch(ordersHistoryWsActions.connect(GET_ALL_HISTORY_ORDERS));
		return (): void => {
			dispatch(ordersHistoryWsActions.disconnect());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!isDefault && !backgroundLocation) {
		return <Outlet />;
	}

	return (
		<section className={styles.container}>
			<div className={styles.content_wrapper}>
				<main className={`${styles.main} pl-5 pr-5`}>
					<Loader loading={loading}>
						<div className={`${styles.content} pt-30`}>
							<ProfileNavigation />
							<div className={styles.feed_container}>
								{/* Покажем обратный порядок заказов, чтобы самые новые были вверху */}
								<FeedList orders={orders?.slice()?.reverse()} />
							</div>
						</div>
					</Loader>
				</main>
			</div>
			<Outlet />
		</section>
	);
};
