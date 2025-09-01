import { Loader } from '@/components/loader/loader.tsx';
import { OrderDetails } from '@/components/modals/order-details/order-details.tsx';
import { useOrdersFeedActions } from '@/services/store/slices/orders-feed-slice.tsx';
import { useEffect, type FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { Modal } from '../../components/modals/shared/modal.tsx';

import type { LoadingPropType } from '@/utils/prop-types-ts.ts';

import type {
	IngredientsReducerStates,
	OrdersFeedReducerStates,
} from '../../utils/store-types.ts';

import styles from './index.module.css';

export const OrderDetailsPage: FC = () => {
	const { number } = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	const { orders, order, loading, loadingModal } = useSelector(
		(state: OrdersFeedReducerStates) => state.OrdersFeedReducer
	);

	const { ingredients } = useSelector(
		(state: IngredientsReducerStates) => state.IngredientsReducer
	);

	const { getOrder, setOrder } = useOrdersFeedActions();

	useEffect(() => {
		if (!number) {
			return;
		}

		const orderNumber = parseInt(number);
		if (isNaN(orderNumber)) {
			return;
		}

		if (order && order.number === orderNumber) {
			return;
		}

		const selectedOrder = orders?.find((order) => order.number === orderNumber);
		console.warn('FIND_ORDER:', selectedOrder);
		if (selectedOrder) {
			setOrder(selectedOrder);
		} else {
			console.warn('UNFIND_ORDER:', order);
			getOrder(orderNumber);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [number, orders, order?.number]);

	//Верстка прелодера для модального окна и полной страницы
	const preload = (load: LoadingPropType): React.ReactElement => (
		<Loader loading={load}>
			<h1> Загрузка...</h1>
		</Loader>
	);

	const backgroundLocation = location.state?.backgroundLocation;
	if (!backgroundLocation) {
		// Прямой переход по URL - показываем полную страницу
		return (
			<div className={`${styles.container} p-10`}>
				<div className={`${styles.content}`}>
					<div className='page-container'>
						{!order || !ingredients || ingredients.length === 0 ? (
							<section className={`${styles.content}`}>
								{preload(loadingModal)}
							</section>
						) : (
							<OrderDetails ingredients={ingredients} order={order} />
						)}
					</div>
				</div>
			</div>
		);
	}

	const closeModal = (): void => {
		navigate(-1);
	};

	if (!order || !ingredients || ingredients.length === 0) {
		return (
			<Modal header='Загрузка...' onClose={() => closeModal()}>
				{preload(loading)}
			</Modal>
		);
	}

	return (
		<Modal header='Заказ:' onClose={() => closeModal()}>
			<OrderDetails ingredients={ingredients} order={order} />
		</Modal>
	);
};
