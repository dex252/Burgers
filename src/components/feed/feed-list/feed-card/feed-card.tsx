import { FormattedDate } from '@krgaa/react-developer-burger-ui-components';

import { CardFooter } from './card-footer/card-footer';

import type { HistoryOrder } from '@/utils/prop-types-ts';
import type { ReactElement } from 'react';

import styles from './feed-card.module.css';

export const FeedCard = ({ order }: { order: HistoryOrder }): ReactElement => {
	return (
		<section className={styles.constructor_element}>
			<div className={`${styles.card_header} ml-5 mt-6 mb-6`}>
				<h1 className='text text_type_digits-default'>#{order.number}</h1>
				<FormattedDate
					className='text text_type_main-default text_color_inactive'
					date={new Date(order.createdAt)}
				/>
			</div>
			<h1 className='text text_type_main-medium pl-5 mb-6'>{order.name}</h1>
			<CardFooter
				key={`footer-${order._id}`}
				ingredients={order.ingredients}
				id={order._id}></CardFooter>
		</section>
	);
};
