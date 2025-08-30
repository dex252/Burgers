//import { useOrdersFeedActions } from '@/services/store/slices/orders-feed-slice';
import { useEffect, type FC } from 'react';
//import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../../components/loader/loader';
import { ordersFeedWsActions } from '../../services/store/slices/orders-feed-slice';

import type { OrdersFeedReducerStates } from '@/utils/store-types';

import styles from './index.module.css';

export const FeedPage: FC = () => {
	const GET_ALL_ORDERS = 'wss://norma.nomoreparties.space/orders/all';
	const dispatch = useDispatch();

	const { orders, loading } = useSelector(
		(state: OrdersFeedReducerStates) => state.OrdersFeedReducer
	);

	useEffect(() => {
		dispatch(ordersFeedWsActions.connect(GET_ALL_ORDERS));
		return (): void => {
			dispatch(ordersFeedWsActions.disconnect());
		};
	}, []);

	return (
		<section className={styles.content}>
			<Loader loading={loading}>
				<div>
					{orders.length > 0 ? (
						<ul>
							{orders.map((order) => (
								<li key={order._id}>
									Order ID: {order._id} | Number: {order.number} | Status:{' '}
									{order.status}
								</li>
							))}
						</ul>
					) : null}
				</div>
			</Loader>
		</section>
	);
};
