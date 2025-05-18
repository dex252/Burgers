import styles from './modal-overlay.module.css';

const ModalOverlay = ({ onClose }) => {
	// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
	return <div className={styles.overlay} onClick={onClose}></div>;
};

export default ModalOverlay;
