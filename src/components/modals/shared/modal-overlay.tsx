import type { MouseEvent, ReactElement } from 'react';

import styles from './modal-overlay.module.css';
type ModalOverlayProps = {
	onClose: (e: MouseEvent<HTMLElement>) => void;
};

const ModalOverlay = ({ onClose }: ModalOverlayProps): ReactElement => {
	return <div className={styles.overlay} onClick={onClose}></div>;
};

export default ModalOverlay;
