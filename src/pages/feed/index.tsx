//import { useOrdersFeedActions } from '@/services/store/slices/orders-feed-slice';
import { useEffect, type FC } from 'react';
//import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Loader } from '../../components/loader/loader';

import type { OrdersFeedReducerStates } from '@/utils/store-types';

import styles from './index.module.css';

export const FeedPage: FC = () => {
	//const { init } = useOrdersFeedActions();
	const { orders, loading } = useSelector(
		(state: OrdersFeedReducerStates) => state.OrdersFeedReducer
	);

	useEffect(() => {
		console.info('init');
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
