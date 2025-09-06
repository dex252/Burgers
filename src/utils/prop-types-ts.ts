export type PositionType = 'top' | 'bottom';

export type LoadingPropType = {
	isSpinner?: boolean;
	isError: boolean;
	withContent?: boolean;
	isErrorMessage?: string;
	isRequested?: boolean;
	isLogout?: boolean;
};

export type IngredientType = 'bun' | 'sauce' | 'main';

export type BaseIngredient = {
	_id: string;
	name: string;
	type: IngredientType;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_large: string;
	image_mobile: string;
	__v: number;
};

export type Ingredient = BaseIngredient & {
	guid: string | undefined;
	index: number | undefined;
	count: number;
};

export type Token = {
	accessToken: string;
	refreshToken: string;
};

export type User = {
	email: string;
	name: string;
};

export type Order = {
	number: number;
	price?: number;
};

export type OrderCreate = {
	name: string;
	order?: Order;
};

export type OrderStatus = 'created' | 'pending' | 'done';

export type HistoryOrder = {
	ingredients: string[];
	_id: string;
	status: OrderStatus;
	number: number;
	createdAt: string;
	updatedAt: string;
	name: string;
};

export type History = {
	orders: HistoryOrder[];
	total: number;
	totalToday: number;
	success?: boolean;
};
