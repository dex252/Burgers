import {
	CurrencyIcon,
	FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo, type FC } from 'react';

import { IngredientLine } from './ingredient-line/ingredient-line';

import type { HistoryOrder, Ingredient } from '@utils/prop-types-ts';

import styles from './order-details.module.css';

type OrderDetailsProps = {
	order: HistoryOrder;
	ingredients: Ingredient[];
};

export const OrderDetails: FC<OrderDetailsProps> = ({ order, ingredients }) => {
	const filterIngredients = order.ingredients.map((id) => {
		return ingredients.find((ingredient) => ingredient?._id === id) || null;
	});

	const price = useMemo(() => {
		return filterIngredients.reduce(
			(sum, i) => sum + (Number(i?.price) || 0),
			0
		);
	}, [filterIngredients]);

	const combineIngredients = useMemo(() => {
		const result: Ingredient[] = [];
		filterIngredients.forEach((ingredient) => {
			if (!ingredient) return;

			const existing = result.find((item) => item._id === ingredient._id);
			if (existing) {
				existing.count += 1;
			} else {
				result.push({ ...ingredient, count: 1 });
			}
		});

		return result;
	}, [filterIngredients]);

	return (
		<section className={`${styles.content}`}>
			<h1 className={`text text_type_digits-default ${styles.header} pb-10`}>
				#{order.number}
			</h1>
			<p className='text text_type_main-medium pb-3'>{order.name}</p>
			<p className={`text text_type_main-small ${styles.order_done} pb-15`}>
				{order.status === 'done'
					? 'Выполнен'
					: order.status === 'pending'
						? 'Готовится'
						: 'Создан'}
			</p>
			<h1 className={`text text_type_main-medium pb-6`}>Состав:</h1>
			<div className={`${styles.image_container} pr-6`}>
				{combineIngredients.map((ingredient) =>
					ingredient?._id === null ? null : (
						<div key={`d${order.number}-${ingredient!._id}`}>
							<IngredientLine ingredient={ingredient} />
						</div>
					)
				)}
			</div>
			<div className={`${styles.wrapper} pt-10`}>
				<FormattedDate
					className='text text_type_main-default text_color_inactive'
					date={new Date(order.createdAt)}
				/>
				<div className={styles.right_content}>
					<p className='text text_type_digits-default'>{price}</p>
					<CurrencyIcon
						type='primary'
						className={`${styles.currency_icon} text text_type_digits-medium ml-6 mr-6`}
					/>
				</div>
			</div>
		</section>
	);
};
