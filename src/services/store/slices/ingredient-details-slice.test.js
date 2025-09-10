import { describe, it, expect } from 'vitest';

import reducer, { initialState } from './ingredient-details-slice';

describe('details-slice', () => {
	it('Возвращает начальное состояние', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it('Выполнить setIngredient', () => {
		const ingredient = {
			_id: '60666c42cc7b410027a1a9be',
			name: 'Мини-салат Экзо-Плантаго',
			type: 'main',
			proteins: 1,
			fat: 2,
			carbohydrates: 3,
			calories: 6,
			price: 4400,
			image: 'https://code.s3.yandex.net/react/code/salad.png',
			image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
			image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
			__v: 0,
		};

		expect(
			reducer(initialState, {
				type: 'details-store/setIngredient',
				payload: ingredient,
			})
		).toEqual({
			ingredient,
		});
	});
});
