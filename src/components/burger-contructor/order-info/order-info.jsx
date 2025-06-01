import React, { useState } from 'react';
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
import { request, GET_ORDER } from '../../../services/api/yandex_api.jsx';
import { useOrderActions } from '../../../services/store/slices/order-detail-slice.jsx';

export const OrderInfo = ({ price }) => {
	const dispatch = useDispatch();
	const ingredients = useSelector(
		(state) => state.IngredientsReducer.ingredients
	);

	const { setOrder } = useOrderActions();
	const [modalContent, setModalContent] = useState({
		header: null,
		content: null,
		isOpen: false,
	});

	const closeModal = (e) => {
		console.info(e);
		setModalContent((prev) => ({ ...prev, isOpen: false }));
	};

	const createOrder = () => {
		const getOrderNumber = async () => {
			const basketContent = [];
			ingredients.forEach((item) => {
				if (item?.count > 0) {
					for (let i = 0; i < item.count; i++) {
						basketContent.push(item._id);
					}
				}
			});
			try {
				var response = await request(GET_ORDER, 'post', {
					ingredients: basketContent,
				});
				setModalContent({
					header: '',
					content: <CreateOrder orderNumber={response.order.number} />,
					isOpen: true,
				});
				setOrder({ name: response?.name, orderId: response?.order?.number });
			} catch (error) {
				setModalContent({
					header: '',
					content: (
						<Loader
							loading={{
								isSpinner: false,
								isErrorMessage: error.message,
								isError: true,
							}}
						/>
					),
					isOpen: true,
				});
				setOrder({ name: null, orderId: 0 });
			}
		};

		setModalContent({
			header: '',
			content: <Loader loading={{ isSpinner: true }} />,
			isOpen: true,
		});

		dispatch(getOrderNumber);
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
