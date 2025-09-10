/// <reference types="cypress" />
import '@4tw/cypress-drag-drop';
import {
	ingredientCardSelector,
	ingredientCardInBasketSelector,
} from 'cypress/support/commands';

const modalCloseSelector = '[data-test="modal-close-button"]';

describe('Тестирование приложения', () => {
	it('Вызов, проверка и закрытие модального окна с ингредиентом', () => {
		const modalIngredientsSelector = '[data-test="ingredient-details"]';
		const modalIngredientsNameSelector =
			'[data-test="ingredient-details-name"]';
		const modalUrl = '/ingredient/643d69a5c3f7b9001cfa093c';

		cy.prepare();
		cy.get(ingredientCardSelector).first().click();

		//Проверим что при клике на ингредиент изменился url
		cy.url().should('include', modalUrl);

		//Проверим что ключевые элементы отображаются
		cy.get(modalIngredientsSelector).should('have.length', 1).and('be.visible');
		cy.get(modalIngredientsNameSelector)
			.should('have.length', 1)
			.and('be.visible');
		cy.get(modalCloseSelector).should('have.length', 1).and('be.visible');

		//Проверим, что название ингредиента совпадает с ожидаемым
		cy.get(modalIngredientsNameSelector).should(
			'contain.text',
			'Краторная булка N-200i'
		);

		//Закроем модальное окно
		cy.get(modalCloseSelector).click();
		cy.url().then((url) => {
			expect(url).to.not.include(modalUrl);
		});
	});

	it('Перетаскивание элементов dnd', () => {
		cy.prepare();
		cy.drag_n_drop();
	});

	it('Создание заказа', () => {
		const createOrderButtonSelector = '[data-test="order-create-button"]';
		const orderNumberInfo = '[data-test="create-order-info"]';
		cy.prepare();
		cy.drag_n_drop();

		//Проверим, что кнопка создания заказа существует
		cy.get(createOrderButtonSelector)
			.should('have.length', 1)
			.and('be.visible');

		//Кликнем на неё
		cy.get(createOrderButtonSelector).click();
		cy.wait('@createOrder');

		//Проверим, что появилось окно с компонентом заказа
		cy.get(orderNumberInfo).should('have.length', 1).and('be.visible');

		//Проверим, что появился крестик с закрытием окна
		cy.get(modalCloseSelector).should('have.length', 1).and('be.visible');

		//И теперь проверим, что оно содержит ожидаемый в ответе текст
		cy.get(orderNumberInfo).should('contain.text', '88275');

		//Выполним клик по компоненту
		cy.get(modalCloseSelector).click();

		//По завершению закрытия окна - убедимся что корзина с заказом была очищена (3 пустых элемента взамен 4 заполненных)
		cy.get(ingredientCardInBasketSelector).should('have.length', 3);
	});
});
