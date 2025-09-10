/// <reference types="cypress" />
// ***********************************************

export const ingredientCardSelector = '[data-test="ingredient-card"]';
const basketSelector = '[data-test="basket"]';
export const ingredientCardInBasketSelector =
	'[data-test="ingredient-card-in-basket"]';

Cypress.Commands.add('prepare', () => {
	cy.visit('/');
	cy.intercept('GET', '**/api/ingredients*', { fixture: 'ingredients' }).as(
		'getIngredients'
	);

	cy.intercept('POST', '**/api/orders', { fixture: 'create-order' }).as(
		'createOrder'
	);

	cy.wait('@getIngredients');
});

Cypress.Commands.add('drag_n_drop', () => {
	cy.get(ingredientCardSelector, { timeout: 5000 })
		.should('have.length.gt', 3)
		.and('be.visible');

	//Первый перетаскиваемый компонент - булка, второй и третий - не булка
	cy.get(ingredientCardSelector).first().drag(basketSelector);
	cy.get(ingredientCardSelector).eq(2).drag(basketSelector);
	cy.get(ingredientCardSelector).eq(4).drag(basketSelector);

	//Смотрим количество в корзине (2 булки + 2 соуса)
	cy.get(ingredientCardInBasketSelector)
		.should('have.length', 4)
		.and('be.visible');
});
