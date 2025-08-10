import type { FC } from 'react';

import styles from './index.module.css';

export const ErrorPage404: FC = () => {
	return (
		<section className={styles.content}>
			<h1>Ошибка 404</h1>
		</section>
	);
};
