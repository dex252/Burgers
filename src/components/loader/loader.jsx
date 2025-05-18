import React from 'react';
import { MoonLoader } from 'react-spinners';
import styles from './loader.module.css';

const SPINNER_COLOR = '#8585AD';
const SPINNER_SIZE = 120;

export const Loader = ({ loading, children }) => {
	if (loading.isSpinner) {
		return (
			<div className={styles.loader_container}>
				<MoonLoader color={SPINNER_COLOR} size={SPINNER_SIZE} />
			</div>
		);
	}

	if (loading.isError) {
		return (
			<div className={`${styles.loader_container} ${styles.error_container}`}>
				<h1>Ошибка</h1>
				<h3>{loading.isErrorMessage}</h3>
			</div>
		);
	}

	return children;
};
