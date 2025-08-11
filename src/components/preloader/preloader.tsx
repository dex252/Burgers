import type { FC } from 'react';

import styles from './preloader.module.css';

export const Preloader: FC = () => {
	return (
		<div className={styles.preloader}>
			<div className={styles.preloader_circle} />
		</div>
	);
};
