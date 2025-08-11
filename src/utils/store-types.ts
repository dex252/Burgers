import type { Action } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';

import type { Ingredient, LoadingPropType, User } from './prop-types-ts';

export type RootState = {
	IngredientsReducer: IngredientsReducerStates;
	DetailsReducer: DetailsReducerStates;
	BasketReducer: BasketReducerStates;
	OrderReducer: OrderReducerStates;
	AuthReducer: AuthReducerStates;
};

export type AppDispatch = ThunkDispatch<RootState, unknown, Action<string>>;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

//#region ingredients-slice.tsx
export type IngredientsState = {
	ingredients: Ingredient[];
	loading: LoadingPropType;
};

export type IngredientsReducerStates = {
	IngredientsReducer: IngredientsState;
};
//#endregion

//#region ingredient-details-slice.tsx
export type DetailsState = {
	ingredient?: Ingredient | null;
};

export type DetailsReducerStates = {
	DetailsReducer: DetailsState;
};
//#endregion

//#region basket-constructor-slice.tsx
export type BasketConstructorState = {
	ingredients: Ingredient[];
	bun: Ingredient | null;
};

export type BasketReducerStates = {
	BasketReducer: BasketConstructorState;
};
//#endregion

//#region order-detail-slice.tsx
export type OrderDetailsState = {
	name: string | null;
	orderId: number;
	loading: LoadingPropType;
	isChange: boolean;
};

export type OrderReducerStates = {
	OrderReducer: OrderDetailsState;
};
//#endregion

//#region auth-slice.tsx
export type AuthState = {
	isAuthorization: boolean;
	isLogout: boolean;
	user?: User | undefined;
	loading: LoadingPropType;
};

export type AuthReducerStates = {
	AuthReducer: AuthState;
};
//#endregion
