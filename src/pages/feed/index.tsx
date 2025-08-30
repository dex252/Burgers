import { FeedDetails } from '@/components/feed/feed-details/feed-details';
import { FeedList } from '@/components/feed/feed-list/feed-container';
import { useEffect, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../../components/loader/loader';
import { ordersFeedWsActions } from '../../services/store/slices/orders-feed-slice';

import type { OrdersFeedReducerStates } from '@/utils/store-types';

import styles from './index.module.css';

export const FeedPage: FC = () => {
	const GET_ALL_ORDERS = 'wss://norma.nomoreparties.space/orders/all';
	const dispatch = useDispatch();

	const { orders, loading, total, totalToday } = useSelector(
		(state: OrdersFeedReducerStates) => state.OrdersFeedReducer
	);

	useEffect(() => {
		dispatch(ordersFeedWsActions.connect(GET_ALL_ORDERS));
		return (): void => {
			dispatch(ordersFeedWsActions.disconnect());
		};
	}, []);

	return (
		<section className={styles.container}>
			<Loader loading={loading}>
				<main className={`${styles.main} pl-5 pr-5`}>
					<FeedList orders={orders}></FeedList>
					<FeedDetails
						orders={orders}
						total={total}
						totalToday={totalToday}></FeedDetails>
				</main>
			</Loader>
		</section>
	);
};
