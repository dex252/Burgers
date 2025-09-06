import type { ReactElement } from 'react';

import styles from './card-image.module.css';

type CardImageProps = {
	src?: string;
	alt?: string;
	text?: string;
	darkened?: boolean;
	size?: number;
};

export const CardImage = ({
	src,
	alt,
	text,
	darkened = false,
	size = 80,
}: CardImageProps): ReactElement => {
	return (
		<div
			className={styles.avatar_container}
			style={{ width: `${size}px`, height: `${size}px` }}>
			<div className={styles.avatar_border}>
				<div className={styles.avatar_content}>
					{src && (
						<img
							className={`${styles.avatar_image} ${darkened ? styles.darkened : ''}`}
							title={alt}
							src={src}
							alt={alt}
							style={{ width: `${size - 8}px`, height: `${size - 8}px` }}
						/>
					)}
					{text && <div className={styles.avatar_text_overlay}>{text}</div>}
				</div>
			</div>
		</div>
	);
};
