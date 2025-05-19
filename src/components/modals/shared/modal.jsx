import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay.jsx';
import * as PropTypes from 'prop-types';

export const REACT_MODAL_COMPONENT = 'react-modals';
const ESCAPE_BUTTON = 'Escape';

export const Modal = ({ children, header, onClose }) => {
	const modalRoot = document.getElementById(REACT_MODAL_COMPONENT);
	const hideModal = (e) => {
		e.preventDefault();
		onClose(e);
	};

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === ESCAPE_BUTTON) {
				onClose(e);
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return createPortal(
		<section>
			<div className={`${styles.modal} p-10`}>
				<div className={`${styles.header} pt-5 pb-5`}>
					<div className='className="text text_type_main-large'>{header}</div>
					<button className={styles.close} onClick={hideModal}>
						<CloseIcon type='primary'></CloseIcon>
					</button>
				</div>
				<div className={styles.content}>{children}</div>
			</div>

			<ModalOverlay onClose={hideModal} />
		</section>,
		modalRoot
	);
};

Modal.propTypes = {
	header: PropTypes.string,
	onClose: PropTypes.func.isRequired,
	children: PropTypes.node,
};
