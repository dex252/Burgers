import type { Action } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';

import type { Ingredient, LoadingPropType } from './prop-types-ts';

export type RootState = {
	IngredientsReducer: IngredientsReducerStates;
	DetailsReducer: DetailsReducerStates;
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
