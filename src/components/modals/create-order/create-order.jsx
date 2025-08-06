import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from '../create-order/create-order.module.css';

export const CreateOrder = ({ orderNumber }) => {
	return (
		<section>
			<p className={`pb-8 ${styles.order_number} text text_type_digits-large`}>
				{orderNumber}
			</p>
			<p className={`pb-15 ${styles.identifier} text text_type_main-medium`}>
				Идентификатор заказа
			</p>
			<div className={`pb-15 ${styles.success_container}`}>
				<CheckMarkIcon className={`${styles.success}`} type='primary' />
			</div>
			<p className={`pb-2 ${styles.identifier} text text_type_main-default`}>
				Ваш заказ начали готовить
			</p>
			<p
				className={`pb-20 ${styles.identifier} text text_type_main-default text_color_inactive`}>
				Дождитесь готовности на орбитальной станции
			</p>
		</section>
	);
};
