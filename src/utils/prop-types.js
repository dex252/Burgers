import * as PropTypes from 'prop-types';

export const ingredientPropType = PropTypes.shape({
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
	proteins: PropTypes.number.isRequired,
	fat: PropTypes.number.isRequired,
	carbohydrates: PropTypes.number.isRequired,
	calories: PropTypes.number.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	image_large: PropTypes.string.isRequired,
	image_mobile: PropTypes.string.isRequired,
	__v: PropTypes.number.isRequired,
	count: PropTypes.number,
	guid: PropTypes.string,
	index: PropTypes.number,
});

export const loadingPropType = PropTypes.shape({
	isSpinner: PropTypes.bool.isRequired,
	isError: PropTypes.bool.isRequired,
	withContent: PropTypes.bool,
	isErrorMessage: PropTypes.string,
});
