export interface IProduct {
	id: string;
	title: string;
	description: string;
	category: string;
	price: number;
	city: string;
	date: Date;
}

export interface IProductFormValues extends Partial<IProduct> {
	time?: Date;
}

export class ProductFormValues implements IProductFormValues {
	id?: string = undefined;
	title: string = '';
	category: string = '';
	description: string = '';
	date?: Date = undefined;
	time?: Date = undefined;
	city: string = '';
	price?: number = undefined;

	constructor(init?: IProductFormValues) {
		if (init && init.date) {
			init.time = init.date;
		}
		Object.assign(this, init);
	}
}
