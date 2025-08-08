import {
	CurrencyIcon,
	Button,
} from '@krgaa/react-developer-burger-ui-components';
import * as PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAuthActions } from '../../../services/store/slices/auth-slice.jsx';
import { useOrderActions } from '../../../services/store/slices/order-detail-slice.jsx';
import { Loader } from '../../loader/loader.jsx';
import { CreateOrder } from '../../modals/create-order/create-order.jsx';
import { Modal } from '../../modals/shared/modal.jsx';

import styles from './order-info.module.css';

export const OrderInfo = ({ price }) => {
	const navigate = useNavigate();
	const { setAuthorization } = useAuthActions();
	const ingredients = useSelector(
		(state) => state.IngredientsReducer.ingredients
	);
	const { getOrder, handleCloseModal } = useOrderActions();
	const { orderId, loading } = useSelector((state) => state.OrderReducer);
	const [modalContent, setModalContent] = useState({
		header: null,
		content: null,
		isOpen: false,
		canClose: false,
	});

	const closeModal = () => {
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

		return () => {
			//console.info('UNMOUNT OrderInfo');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, orderId]);

	const createOrder = async () => {
		setModalContent({
			header: '',
			content: <Loader loading={{ isSpinner: true, isError: false }} />,
			isOpen: true,
			canClose: false,
		});

		const basketContent = [];
		ingredients.forEach((item) => {
			if (item?.count > 0) {
				for (let i = 0; i < item.count; i++) {
					basketContent.push(item._id);
				}
			}
		});

		let isSuccess = await getOrder(basketContent);
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
					onClose={(e) => closeModal(e)}
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
						onClick={createOrder}>
						Оформить заказ
					</Button>
				</div>
			)}
		</section>
	);
};

OrderInfo.propTypes = {
	price: PropTypes.number.isRequired,
};
