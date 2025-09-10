import { describe, it, expect } from 'vitest';

import reducer, { initialState } from './ingredients-slice';

describe('ingredients-slice', () => {
	it('Возвращает начальное состояние', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it('Увеличение счетчика updateCount', () => {
		const id = '60666c42cc7b410027a1a9bd';
		const initialStateWithIngredients = {
			ingredients: [
				{
					_id: id,
					name: 'Кристаллы марсианских альфа-сахаридов',
					type: 'main',
					proteins: 234,
					fat: 432,
					carbohydrates: 111,
					calories: 189,
					price: 762,
					image: 'https://code.s3.yandex.net/react/code/core.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
					__v: 0,
					count: 2,
					guid:
						Date.now().toString(36) + Math.random().toString(36).substring(2),
					index: 0,
				},
				{
					_id: '60666c42cc7b410027a1a9be',
					name: 'Мини-салат Экзо-Плантаго',
					type: 'main',
					proteins: 1,
					fat: 2,
					carbohydrates: 3,
					calories: 6,
					price: 4400,
					image: 'https://code.s3.yandex.net/react/code/salad.png',
					image_mobile:
						'https://code.s3.yandex.net/react/code/salad-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
					__v: 0,
					count: 1,
					guid:
						Date.now().toString(36) + Math.random().toString(36).substring(2),
					index: 1,
				},
			],
			loading: {
				isError: false,
				isErrorMessage: undefined,
				isSpinner: false,
			},
		};

		expect(
			reducer(initialStateWithIngredients, {
				type: 'ingredients-store/updateCount',
				payload: { id: id, delta: 3 },
			})
		).toEqual({
			...initialStateWithIngredients,
			ingredients: [
				{
					...initialStateWithIngredients.ingredients[0],
					count: 5,
				},
				initialStateWithIngredients.ingredients[1],
			],
		});
	});

	it('Уменьшение счетчика updateCount', () => {
		const id = '60666c42cc7b410027a1a9ba';

		const initialStateWithIngredients = {
			ingredients: [
				{
					_id: id,
					name: 'Соус с шипами Антарианского плоскоходца',
					type: 'sauce',
					proteins: 101,
					fat: 99,
					carbohydrates: 100,
					calories: 100,
					price: 88,
					image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
					image_mobile:
						'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
					image_large:
						'https://code.s3.yandex.net/react/code/sauce-01-large.png',
					__v: 0,
					count: 5,
					guid:
						Date.now().toString(36) + Math.random().toString(36).substring(2),
					index: undefined,
				},
			],
			loading: {
				isError: false,
				isErrorMessage: undefined,
				isSpinner: false,
			},
		};

		expect(
			reducer(initialStateWithIngredients, {
				type: 'ingredients-store/updateCount',
				payload: { id: id, delta: -2 },
			})
		).toEqual({
			...initialStateWithIngredients,
			ingredients: [
				{
					...initialStateWithIngredients.ingredients[0],
					count: 3,
				},
			],
		});
	});

	it('Ингредиент не найден при увеличении счетчика updateCount', () => {
		const initialStateWithIngredients = {
			ingredients: [
				{
					_id: '60666c42cc7b410027a1a9bd',
					name: 'Кристаллы марсианских альфа-сахаридов',
					type: 'main',
					proteins: 234,
					fat: 432,
					carbohydrates: 111,
					calories: 189,
					price: 762,
					image: 'https://code.s3.yandex.net/react/code/core.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
					__v: 0,
					count: 2,
					guid:
						Date.now().toString(36) + Math.random().toString(36).substring(2),
					index: undefined,
				},
			],
			loading: {
				isError: false,
				isErrorMessage: undefined,
				isSpinner: false,
			},
		};

		expect(
			reducer(initialStateWithIngredients, {
				type: 'ingredients-store/updateCount',
				payload: { id: '999', delta: 3 },
			})
		).toEqual(initialStateWithIngredients);
	});

	it('Очистить счётчики clearCounts', () => {
		const initialStateWithIngredients = {
			ingredients: [
				{
					_id: '60666c42cc7b410027a1a9bd',
					name: 'Кристаллы марсианских альфа-сахаридов',
					type: 'main',
					proteins: 234,
					fat: 432,
					carbohydrates: 111,
					calories: 189,
					price: 762,
					image: 'https://code.s3.yandex.net/react/code/core.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
					__v: 0,
					guid: '',
					index: undefined,
				},
				{
					_id: '60666c42cc7b410027a1a9be',
					name: 'Мини-салат Экзо-Плантаго',
					type: 'main',
					proteins: 1,
					fat: 2,
					carbohydrates: 3,
					calories: 6,
					price: 4400,
					image: 'https://code.s3.yandex.net/react/code/salad.png',
					image_mobile:
						'https://code.s3.yandex.net/react/code/salad-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
					__v: 0,
					count: 3,
					guid: '',
					index: undefined,
				},
			],
			loading: {
				isError: false,
				isErrorMessage: undefined,
				isSpinner: false,
			},
		};

		expect(
			reducer(initialStateWithIngredients, {
				type: 'ingredients-store/clearCounts',
			})
		).toEqual({
			...initialStateWithIngredients,
			ingredients: [
				{
					...initialStateWithIngredients.ingredients[0],
					count: 0,
				},
				{
					...initialStateWithIngredients.ingredients[1],
					count: 0,
				},
			],
		});
	});

	it('Выполнить _REQUEST', () => {
		expect(
			reducer(initialState, {
				type: 'ingredients-store/_REQUEST',
			})
		).toEqual({
			...initialState,
			loading: {
				...initialState.loading,
				isSpinner: true,
				isError: false,
			},
		});
	});

	it('Выполнить _SUCCESS', () => {
		const ingredients = [
			{
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
				count: 0,
				guid: Date.now().toString(36) + Math.random().toString(36).substring(2),
				index: undefined,
			},
		];

		const stateWithLoading = {
			ingredients: [],
			loading: {
				isError: false,
				isErrorMessage: undefined,
				isSpinner: true,
			},
		};

		expect(
			reducer(stateWithLoading, {
				type: 'ingredients-store/_SUCCESS',
				payload: ingredients,
			})
		).toEqual({
			ingredients,
			loading: {
				isError: false,
				isErrorMessage: undefined,
				isSpinner: false,
			},
		});
	});

	it('Выполнить _ERROR', () => {
		const errorMessage = 'Ошибка загрузки';

		const stateWithLoading = {
			ingredients: [],
			loading: {
				isError: false,
				isErrorMessage: undefined,
				isSpinner: true,
			},
		};

		expect(
			reducer(stateWithLoading, {
				type: 'ingredients-store/_ERROR',
				payload: errorMessage,
			})
		).toEqual({
			ingredients: [],
			loading: {
				isError: true,
				isErrorMessage: errorMessage,
				isSpinner: false,
			},
		});
	});
});
