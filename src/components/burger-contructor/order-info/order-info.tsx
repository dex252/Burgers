import { useAppSelector } from '@/utils/hooks.tsx';
import {
	CurrencyIcon,
	Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthActions } from '../../../services/store/slices/auth-slice';
import { useOrderActions } from '../../../services/store/slices/order-detail-slice';
import { Loader } from '../../loader/loader.js';
import { CreateOrder } from '../../modals/create-order/create-order';
import { Modal } from '../../modals/shared/modal.tsx';

import type {
	IngredientsReducerStates,
	OrderReducerStates,
} from '@/utils/store-types.ts';
import type { ReactElement, ReactNode } from 'react';

import styles from './order-info.module.css';

type ModalContentState = {
	header: string | null;
	content: ReactNode | null;
	isOpen: boolean;
	canClose: boolean;
};

export const OrderInfo = ({ price }: { price: number }): ReactElement => {
	const navigate = useNavigate();
	const { setAuthorization } = useAuthActions();
	const ingredients = useAppSelector(
		(state: IngredientsReducerStates) => state.IngredientsReducer.ingredients
	);
	const { getOrder, handleCloseModal } = useOrderActions();
	const { orderId, loading } = useAppSelector(
		(state: OrderReducerStates) => state.OrderReducer
	);
	const [modalContent, setModalContent] = useState<ModalContentState>({
		header: null,
		content: null,
		isOpen: false,
		canClose: false,
	});

	const closeModal = (): void => {
		handleCloseModal();
		setModalContent((prev) => ({ ...prev, isOpen: false }));
	};

	useEffect(() => {
		if (loading.isLogout) {
			return;
		}

		if (loading.isRequested) {
			return;
		}

		if (loading.isError === true) {
			setModalContent({
				header: '',
				content: (
					<Loader
						loading={{
							isSpinner: false,
							isErrorMessage: loading.isErrorMessage,
							isError: true,
						}}
					/>
				),
				isOpen: true,
				canClose: true,
			});

			return;
		}

		if (!modalContent.isOpen) {
			return;
		}

		setModalContent({
			header: '',
			content: <CreateOrder orderNumber={orderId} />,
			isOpen: true,
			canClose: true,
		});

		// return () => {
		// 	console.info('UNMOUNT OrderInfo');
		// };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, orderId]);

	const createOrder = async (): Promise<void> => {
		setModalContent({
			header: '',
			content: <Loader loading={{ isSpinner: true, isError: false }} />,
			isOpen: true,
			canClose: false,
		});

		const basketContent: string[] = [];
		ingredients.forEach((item) => {
			if (item?.count > 0) {
				for (let i = 0; i < item.count; i++) {
					basketContent.push(item._id);
				}
			}
		});

		const isSuccess = await getOrder(basketContent);
		setAuthorization();
		if (!isSuccess) {
			navigate('/login');
		}
	};

	return (
		<section>
			{modalContent.isOpen ? (
				<Modal
					header={modalContent.header}
					onClose={closeModal}
					canCloseModal={modalContent.canClose}>
					{modalContent.content}
				</Modal>
			) : (
				<div className={`${styles.order_content} mr-5`}>
					<div className={`${styles.price} ml-5 pr-10`}>
						<p className={`${styles.price_text} text text_type_digits-medium`}>
							{price}
						</p>
						<CurrencyIcon
							type='primary'
							className={`${styles.currency_icon} text text_type_digits-medium ml-6`}
						/>
					</div>
					<Button
						htmlType='button'
						type='primary'
						size='medium'
						data-test='order-create-button'
						onClick={createOrder}>
						Оформить заказ
					</Button>
				</div>
			)}
		</section>
	);
};
