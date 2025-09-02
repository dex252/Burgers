import { useOrdersFeedActions } from '@/services/store/slices/orders-feed-slice';
import { useSelector } from 'react-redux';

import { OrderDetailsPage } from '../..';

import type { OrdersFeedReducerStates } from '@/utils/store-types';
import type { FC } from 'react';

export const OrderDetailsFeedPage: FC = () => {
	const { orders, order, loading, loadingModal } = useSelector(
		(state: OrdersFeedReducerStates) => state.OrdersFeedReducer
	);

	const orderDetailsActions = useOrdersFeedActions();

	return (
		<OrderDetailsPage
			orders={orders}
			order={order}
			loading={loading}
			loadingModal={loadingModal}
			orderDetailsActions={orderDetailsActions}
		/>
	);
};
