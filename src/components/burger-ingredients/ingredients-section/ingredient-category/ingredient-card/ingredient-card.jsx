import { useDetailsActions } from '../../../../../services/store/slices/ingredient-details-slice';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import * as PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';

export const IngredientCard = ({ ingredient }) => {
	const { setIngredient } = useDetailsActions();
	const navigate = useNavigate();
	const location = useLocation();
	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: ingredient,
	});

	function handleClick() {
		setIngredient(ingredient);
		navigate(`/ingredient/${ingredient._id}`, {
			state: { backgroundLocation: location },
		});
	}

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<section
			ref={dragRef}
			className={styles.ingredient_card}
			onClick={(ingredient) => handleClick(ingredient)}>
			{ingredient.count > 0 && (
				<Counter
					count={ingredient.count}
					size='default'
					extraClass={`${styles.counter} mr-1`}></Counter>
			)}
			<div className={styles.ingredient_card_content}>
				<img
					className='ml-4'
					src={ingredient.image}
					alt={ingredient.name}></img>
				<div className={`${styles.ingredient_card_price} mb-1 mt-1`}>
					<p className='text text_type_digits-default'>{ingredient.price}</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
			<p className={styles.ingredient_name}>{ingredient.name}</p>
		</section>
	);
};

IngredientCard.propTypes = {
	ingredient: ingredientPropType.isRequired,
	openModal: PropTypes.func,
};
