import styles from '../state-card/state-card.module.css';

export const StateCard = ({ name, count }) => {
	return (
		<section className={`mr-5 ${styles.content}`}>
			<p className='text text_type_main-default text_color_inactive'>{name}</p>
			<p className='text text_type_main-default text_color_inactive'>{count}</p>
		</section>
	);
};
