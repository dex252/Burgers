import type { HistoryOrder } from '@/utils/prop-types-ts';
import type { ReactElement } from 'react';

import styles from './feed-details.module.css';

export const FeedDetails = ({
	orders,
	total,
	totalToday,
}: {
	orders: HistoryOrder[];
	total: number;
	totalToday: number;
}): ReactElement => {
	const doneOrders = orders.filter((e) => e.status == 'done');
	const pendingOrders = orders.filter(
		(e) => e.status == 'pending' || e.status == 'created'
	);
	const formattedTotal = total.toLocaleString('ru-RU');
	const formattedTotalToday = totalToday.toLocaleString('ru-RU');

	// Функция для разбивки заказов на колонки
	const splitIntoColumns = (
		orders: HistoryOrder[],
		maxPerColumn = 10
	): HistoryOrder[][] => {
		const columns = [];
		for (let i = 0; i < orders.length; i += maxPerColumn) {
			columns.push(orders.slice(i, i + maxPerColumn));
		}
		return columns;
	};

	const doneColumns = splitIntoColumns(doneOrders);
	const pendingColumns = splitIntoColumns(pendingOrders);

	return (
		<section className={styles.container}>
			<div className={styles.grid_container}>
				<div className={`${styles.column} mr-9`}>
					<h1 className={`${styles.title} text text_type_main-medium mb-6`}>
						Готовы:
					</h1>

					<div className={styles.columns_container}>
						{doneColumns.map((column, columnIndex) => (
							<div key={columnIndex} className={styles.column_inner}>
								{column.map((order) => (
									<p
										className={`text text_type_digits-default ${styles.order_number_done}`}
										key={order._id}>
										{order.number}
									</p>
								))}
							</div>
						))}
					</div>
				</div>
				<div className={styles.column}>
					<h1 className={`${styles.title} text text_type_main-medium mb-6`}>
						В работе:
					</h1>

					<div className={styles.columns_container}>
						{pendingColumns.map((column, columnIndex) => (
							<div key={columnIndex} className={styles.column_inner}>
								{column.map((order) => (
									<p className='text text_type_digits-default' key={order._id}>
										{order.number}
									</p>
								))}
							</div>
						))}
					</div>
				</div>
			</div>
			<div>
				<h1 className={`${styles.title} text text_type_main-medium pt-15`}>
					Выполнено за всё время:
				</h1>
				<p
					className={`pb-8 ${styles.total_number} text text_type_digits-large`}>
					{formattedTotal}
				</p>
			</div>
			<div>
				<h1 className={`${styles.title} text text_type_main-medium pt-15`}>
					Выполнено за сегодня:
				</h1>
				<p
					className={`pb-8 ${styles.total_number} text text_type_digits-large`}>
					{formattedTotalToday}
				</p>
			</div>
		</section>
	);
};
