import { useOrdersHistoryActions } from '@/services/store/slices/orders-history-slice';
import { useSelector } from 'react-redux';

import { OrderDetailsPage } from '../..';

import type { OrdersHistoryReducerStates } from '@/utils/store-types';
import type { FC } from 'react';

export const OrderDetailsHistoryPage: FC = () => {
	const { orders, order, loading, loadingModal } = useSelector(
		(state: OrdersHistoryReducerStates) => state.OrdersHistoryReducer
	);

	const orderDetailsActions = useOrdersHistoryActions();

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
