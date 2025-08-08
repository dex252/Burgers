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

export type Ingredient = {
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
	count: number;
	guid: string | undefined;
	index: number | undefined;
};
