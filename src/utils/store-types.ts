import type {
	ActionCreatorWithPayload,
	ActionCreatorWithoutPayload,
} from '@reduxjs/toolkit';

import type {
	Ingredient,
	LoadingPropType,
	User,
	HistoryOrder,
} from './prop-types-ts';

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
	isLoadingAuthorization: boolean;
	isLogout: boolean;
	user?: User | undefined;
	loading: LoadingPropType;
};

export type AuthReducerStates = {
	AuthReducer: AuthState;
};
//#endregion

//#region orders-feed.tsx

export type OrdersFeedState = {
	orders: HistoryOrder[];
	total: number;
	totalToday: number;
	loading: LoadingPropType;
	loadingModal: LoadingPropType;
	order?: HistoryOrder;
};

export type OrdersFeedReducerStates = {
	OrdersFeedReducer: OrdersFeedState;
};
//#endregion

//#region orders-history.tsx
export type OrdersHistoryState = OrdersFeedState;
export type OrdersHistoryReducerStates = {
	OrdersHistoryReducer: OrdersHistoryState;
};
//#endregion

export type TWsActions<R, S> = {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	sendMessage?: ActionCreatorWithPayload<S>;
	onMessage: ActionCreatorWithPayload<R>;
};

export type OrdersDetailsActions = {
	getOrder: (orderNumber: number) => Promise<boolean>;
	setOrder: (historyOrder: HistoryOrder) => void;
};
