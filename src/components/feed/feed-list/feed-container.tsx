import { FeedCard } from './feed-card/feed-card';

import type { HistoryOrder } from '@/utils/prop-types-ts';
import type { ReactElement } from 'react';

import styles from './feed-container.module.css';

export const FeedList = ({
	orders,
}: {
	orders: HistoryOrder[];
}): ReactElement => {
	return (
		<section className={styles.container}>
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mr-5 pl-5 mb-5`}>
				Лента заказов
			</h1>
			<div className={styles.content_wrapper}>
				<div className={`${styles.feed_section} pl-5 pr-5`}>
					{orders.map((order) => (
						<div key={order._id}>
							<FeedCard order={order}></FeedCard>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
