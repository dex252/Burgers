export type PositionType = 'top' | 'bottom';

export type LoadingPropType = {
	isSpinner: boolean;
	isError: boolean;
	withContent?: boolean;
	isErrorMessage?: string;
};

export enum IngredientType {
	Bun,
	Main,
	Sauce,
}

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
	index?: number | undefined;
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
