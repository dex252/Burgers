import type { FC } from 'react';

import styles from './state-card.module.css';

type IStateCardProps = {
	name: string;
	count: number;
};

export const StateCard: FC<IStateCardProps> = ({ name, count }) => {
	return (
		<section className={`mr-5 ${styles.content}`}>
			<p className='text text_type_main-default text_color_inactive'>{name}</p>
			<p className='text text_type_main-default text_color_inactive'>{count}</p>
		</section>
	);
};
