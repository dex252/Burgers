import type { Action } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';

import type { Ingredient, LoadingPropType } from './prop-types-ts';

export type RootState = {
	IngredientsReducer: IngredientsReducerStates;
};

export type AppDispatch = ThunkDispatch<RootState, unknown, Action<string>>;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

//#region inggredient-slice.tsx
export type IngredientsState = {
	ingredients: Ingredient[];
	loading: LoadingPropType;
};

export type IngredientsReducerStates = {
	IngredientsReducer: IngredientsState;
};
//#endregion
