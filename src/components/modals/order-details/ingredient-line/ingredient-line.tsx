import { CardImage } from '@/components/feed/feed-list/feed-card/card-footer/card-image/card-image';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { FC } from 'react';

import type { Ingredient } from '@utils/prop-types-ts';

import styles from './ingredient-line.module.css';

type IngredientLineProps = {
	ingredient: Ingredient | null;
};

export const IngredientLine: FC<IngredientLineProps> = ({ ingredient }) => {
	if (ingredient === null) {
		return null;
	}

	return (
		<section className={`${styles.container} pb-4`}>
			<div className={`${styles.left_content}`}>
				<CardImage src={ingredient.image_mobile} alt={ingredient.name} />
				<h1 className={`${styles.ingredient_name} text pl-4`}>
					{ingredient.name}
				</h1>
			</div>
			<div className={`${styles.right_content} pl-4`}>
				<p className='text text_type_digits-default'>
					{ingredient.count} x {ingredient.price}
				</p>
				<CurrencyIcon type='primary' />
			</div>
		</section>
	);
};
