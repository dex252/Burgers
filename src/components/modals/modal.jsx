import React from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay.jsx';
import * as PropTypes from 'prop-types';

export const REACT_MODAL_COMPONENT = 'react-modals';

export const Modal = (props) => {
	const modalRoot = document.getElementById(REACT_MODAL_COMPONENT);
	const hideModal = (e) => {
		e.preventDefault();
		props.onClose(e);
	};

	return createPortal(
		<section>
			<div className={styles.modal}>
				<div className={styles.header}>
					<div className='className="text text_type_main-large'>
						{props.header}
					</div>
					<button className={styles.close} onClick={hideModal}>
						<CloseIcon type='primary'></CloseIcon>
					</button>
				</div>
				<div className={styles.content}>{props.children}</div>
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
