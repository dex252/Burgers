import React, { useState, useEffect } from 'react';
import styles from './order-info.module.css';
import * as PropTypes from 'prop-types';
import {
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../../modals/shared/modal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { CreateOrder } from '../../modals/create-order/create-order.jsx';
import { Loader } from '../../loader/loader.jsx';
import { getOrder } from '../../../services/store/slices/order-detail-slice.jsx';

export const OrderInfo = ({ price }) => {
	const dispatch = useDispatch();
	const ingredients = useSelector(
		(state) => state.IngredientsReducer.ingredients
	);
	const { orderId, loading } = useSelector((state) => state.OrderReducer);
	const [modalContent, setModalContent] = useState({
		header: null,
		content: null,
		isOpen: false,
	});

	const closeModal = (e) => {
		console.info(e);
		setModalContent((prev) => ({ ...prev, isOpen: false }));
	};

	useEffect(() => {
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
			});

			return;
		}

		setModalContent({
			header: '',
			content: <CreateOrder orderNumber={orderId} />,
			isOpen: true,
		});

		return () => {
			console.info('UNMOUNT OrderInfo');
		};
	}, [loading, orderId]);

	const createOrder = () => {
		setModalContent({
			header: '',
			content: <Loader loading={{ isSpinner: true }} />,
			isOpen: true,
		});

		const basketContent = [];
		ingredients.forEach((item) => {
			if (item?.count > 0) {
				for (let i = 0; i < item.count; i++) {
					basketContent.push(item._id);
				}
			}
		});
		dispatch(getOrder(basketContent));
	};

	return (
		<section>
			{modalContent.isOpen ? (
				<Modal header={modalContent.header} onClose={(e) => closeModal(e)}>
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
