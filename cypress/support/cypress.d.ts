import './commands';

declare global {
	namespace Cypress {
		interface Chainable {
			prepare(): void;
			drag_n_drop(): void;
		}
	}
}
