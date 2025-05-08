import React from 'react';
import styles from './burger-constructor.module.css';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';

export const BurgerConstructor = ({ ingredients }) => {
	console.log(ingredients);

	return <section className={styles.burger_constructor}></section>;
};

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
