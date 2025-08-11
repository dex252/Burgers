import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import ModalOverlay from './modal-overlay';

import type { FC, ReactNode } from 'react';

import styles from './modal.module.css';

export const REACT_MODAL_COMPONENT = 'react-modals';
const ESCAPE_BUTTON = 'Escape';

type IModalProps = {
	header: string | null;
	canCloseModal?: boolean;
	children: ReactNode;
	onClose: (e?: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Modal: FC<IModalProps> = ({
	children = false,
	header,
	onClose,
	canCloseModal = true,
}) => {
	const modalRoot = document.getElementById(REACT_MODAL_COMPONENT);
	if (!modalRoot) {
		throw new Error(
			`Элемент с идентификатором '${REACT_MODAL_COMPONENT}' н найден`
		);
	}
	const hideModal = (e: React.MouseEvent<HTMLElement>): void => {
		if (!canCloseModal) {
			return;
		}

		e.preventDefault();
		onClose();
	};

	useEffect(() => {
		if (!canCloseModal) {
			return;
		}

		const handleKeyDown = (e: KeyboardEvent): void => {
			if (e.key === ESCAPE_BUTTON) {
				onClose();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return (): void => {
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
