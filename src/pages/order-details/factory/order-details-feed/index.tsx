import { useOrdersFeedActions } from '@/services/store/slices/orders-feed-slice';
import { useAppSelector } from '@/utils/hooks';

import { OrderDetailsPage } from '../..';

import type { OrdersFeedReducerStates } from '@/utils/store-types';
import type { FC } from 'react';

export const OrderDetailsFeedPage: FC = () => {
	const { orders, order, loading, loadingModal } = useAppSelector(
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
