import { describe, it, expect } from 'vitest';

import reducer, { initialState } from './basket-constructor-slice';

describe('basket-slice', () => {
	it('Возвращает начальное состояние', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it('Добавить ингредиент в корзину addInBasket', () => {
		const ingredient = {
			_id: '60666c42cc7b410027a1a9b1',
			name: 'Краторная булка N-200i',
			type: 'bun',
			proteins: 80,
			fat: 24,
			carbohydrates: 53,
			calories: 420,
			price: 1255,
			image: 'https://code.s3.yandex.net/react/code/bun-02.png',
			image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
			image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
			__v: 0,
		};

		const guid =
			Date.now().toString(36) + Math.random().toString(36).substring(2);

		const payload = {
			ingredient,
			guid: guid,
			index: 0,
		};

		expect(
			reducer(initialState, {
				type: 'basket-store/addInBasket',
				payload,
			})
		).toEqual({
			...initialState,
			ingredients: [
				{
					...ingredient,
					guid: guid,
					index: 0,
				},
			],
		});
	});

	it('Выполнить removeFromBasket', () => {
		const includeGuid =
			Date.now().toString(36) + Math.random().toString(36).substring(2);

		const excludeGuid =
			Date.now().toString(36) + Math.random().toString(36).substring(2);

		const initialStateWithItems = {
			bun: null,
			ingredients: [
				{
					_id: '60666c42cc7b410027a1a9b1',
					name: 'Краторная булка N-200i',
					type: 'bun',
					proteins: 80,
					fat: 24,
					carbohydrates: 53,
					calories: 420,
					price: 1255,
					image: 'https://code.s3.yandex.net/react/code/bun-02.png',
					image_mobile:
						'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
					__v: 0,
					guid: includeGuid,
					index: 0,
				},
				{
					_id: '60666c42cc7b410027a1a9b5',
					name: 'Говяжий метеорит (отбивная)',
					type: 'main',
					proteins: 800,
					fat: 800,
					carbohydrates: 300,
					calories: 2674,
					price: 3000,
					image: 'https://code.s3.yandex.net/react/code/meat-04.png',
					image_mobile:
						'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
					image_large:
						'https://code.s3.yandex.net/react/code/meat-04-large.png',
					__v: 0,
					guid: excludeGuid,
					index: 1,
				},
			],
		};

		expect(
			reducer(initialStateWithItems, {
				type: 'basket-store/removeFromBasket',
				payload: { guid: excludeGuid },
			})
		).toEqual({
			bun: null,
			ingredients: [
				{
					_id: '60666c42cc7b410027a1a9b1',
					name: 'Краторная булка N-200i',
					type: 'bun',
					proteins: 80,
					fat: 24,
					carbohydrates: 53,
					calories: 420,
					price: 1255,
					image: 'https://code.s3.yandex.net/react/code/bun-02.png',
					image_mobile:
						'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
					__v: 0,
					guid: includeGuid,
					index: 0,
				},
			],
		});
	});

	it('Очистить корзину clearBasket', () => {
		const initialStateWithItems = {
			bun: {
				_id: '60666c42cc7b410027a1a9b1',
				name: 'Краторная булка N-200i',
				type: 'bun',
				proteins: 80,
				fat: 24,
				carbohydrates: 53,
				calories: 420,
				price: 1255,
				image: 'https://code.s3.yandex.net/react/code/bun-02.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
				image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
				__v: 0,
			},
			ingredients: [
				{
					_id: '60666c42cc7b410027a1a9b5',
					name: 'Говяжий метеорит (отбивная)',
					type: 'main',
					proteins: 800,
					fat: 800,
					carbohydrates: 300,
					calories: 2674,
					price: 3000,
					image: 'https://code.s3.yandex.net/react/code/meat-04.png',
					image_mobile:
						'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
					image_large:
						'https://code.s3.yandex.net/react/code/meat-04-large.png',
					__v: 0,
					guid:
						Date.now().toString(36) + Math.random().toString(36).substring(2),
					index: 0,
				},
			],
		};

		expect(
			reducer(initialStateWithItems, {
				type: 'basket-store/clearBasket',
			})
		).toEqual(initialState);
	});

	it('Добавить в корзину булки setBun', () => {
		const bun = {
			_id: '60666c42cc7b410027a1a9b1',
			name: 'Краторная булка N-200i',
			type: 'bun',
			proteins: 80,
			fat: 24,
			carbohydrates: 53,
			calories: 420,
			price: 1255,
			image: 'https://code.s3.yandex.net/react/code/bun-02.png',
			image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
			image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
			__v: 0,
		};

		expect(
			reducer(initialState, {
				type: 'basket-store/setBun',
				payload: bun,
			})
		).toEqual({
			...initialState,
			bun,
		});
	});

	it('Убрать булку из корзины unSetBun', () => {
		const initialStateWithBun = {
			bun: {
				_id: '60666c42cc7b410027a1a9b1',
				name: 'Краторная булка N-200i',
				type: 'bun',
				proteins: 80,
				fat: 24,
				carbohydrates: 53,
				calories: 420,
				price: 1255,
				image: 'https://code.s3.yandex.net/react/code/bun-02.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
				image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
				__v: 0,
			},
			ingredients: [],
		};

		expect(
			reducer(initialStateWithBun, {
				type: 'basket-store/unSetBun',
			})
		).toEqual(initialState);
	});

	it('Перетасовка ингредиентов при drag&drop sortIngredient', () => {
		const draggedGuid =
			Date.now().toString(36) + Math.random().toString(36).substring(2);

		const targetGuid =
			Date.now().toString(36) + Math.random().toString(36).substring(2);

		const otherGuid =
			Date.now().toString(36) + Math.random().toString(36).substring(2);
		const initialStateWithItems = {
			bun: null,
			ingredients: [
				{
					_id: '60666c42cc7b410027a1a9bf',
					name: 'Сыр с астероидной плесенью',
					type: 'main',
					proteins: 84,
					fat: 48,
					carbohydrates: 420,
					calories: 3377,
					price: 4142,
					image: 'https://code.s3.yandex.net/react/code/cheese.png',
					image_mobile:
						'https://code.s3.yandex.net/react/code/cheese-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
					__v: 0,
					guid: targetGuid,
					index: 0,
				},
				{
					_id: '60666c42cc7b410027a1a9b3',
					name: 'Филе Люминесцентного тетраодонтимформа',
					type: 'main',
					proteins: 44,
					fat: 26,
					carbohydrates: 85,
					calories: 643,
					price: 988,
					image: 'https://code.s3.yandex.net/react/code/meat-03.png',
					image_mobile:
						'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
					image_large:
						'https://code.s3.yandex.net/react/code/meat-03-large.png',
					__v: 0,
					guid: otherGuid,
					index: 1,
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
					guid: draggedGuid,
					index: 2,
				},
			],
		};

		const payload = {
			draggedGuid: draggedGuid,
			targetGuid: targetGuid,
		};

		const result = reducer(initialStateWithItems, {
			type: 'basket-store/sortIngredient',
			payload,
		});

		expect(result.ingredients).toHaveLength(3);
		expect(result.ingredients[0].guid).toBe(draggedGuid);
		expect(result.ingredients[1].guid).toBe(targetGuid);
		expect(result.ingredients[2].guid).toBe(otherGuid);
		expect(result.ingredients[0].index).toBe(0);
		expect(result.ingredients[1].index).toBe(1);
		expect(result.ingredients[2].index).toBe(2);
	});
});
