import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import * as PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import ModalOverlay from './modal-overlay.jsx';

import styles from './modal.module.css';

export const REACT_MODAL_COMPONENT = 'react-modals';
const ESCAPE_BUTTON = 'Escape';

export const Modal = ({ children, header, onClose, canCloseModal = true }) => {
	const modalRoot = document.getElementById(REACT_MODAL_COMPONENT);
	const hideModal = (e) => {
		if (!canCloseModal) {
			return;
		}

		e.preventDefault();
		onClose(e);
	};

	useEffect(() => {
		if (!canCloseModal) {
			return;
		}

		const handleKeyDown = (e) => {
			if (e.key === ESCAPE_BUTTON) {
				onClose(e);
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [canCloseModal]);

	return createPortal(
		<section>
			<div className={`${styles.modal} p-10`}>
				<div className={`${styles.header} pt-5 pb-5`}>
					<div className='className="text text_type_main-large'>{header}</div>
					<button
						className={styles.close}
						onClick={hideModal}
						disabled={!canCloseModal}>
						<CloseIcon
							type={canCloseModal ? 'primary' : 'secondary'}></CloseIcon>
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
