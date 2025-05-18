import React from 'react';
import styles from './order-info.module.css';
import * as PropTypes from 'prop-types';
import {
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderInfo = ({ price }) => {
	return (
		<section className={`${styles.order_content} mr-5`}>
			<div className={`${styles.price} ml-5 pr-10`}>
				<p className={`${styles.price_text} text text_type_digits-medium`}>
					{price}
				</p>
				<CurrencyIcon
					type='primary'
					className={`${styles.currency_icon} text text_type_digits-medium ml-6`}></CurrencyIcon>
			</div>
			<Button htmlType='button' type='primary' size='medium'>
				Оформить заказ
			</Button>
		</section>
	);
};

OrderInfo.propTypes = {
	price: PropTypes.number.isRequired,
};
