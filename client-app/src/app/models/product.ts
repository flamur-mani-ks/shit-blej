export interface IProductsEnvelope {
  products: IProduct[];
  productCount: number;
}

export interface IProduct {
	id: string;
	title: string;
	description: string;
	category: string;
	price: number;
	city: string;
	date: Date;
	isOwner: boolean;
	attendees: IAttendee[];
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

export interface IAttendee {
	username: string;
	displayName: string;
	image: string;
	isOwner: boolean;
	phoneNumber: string;
	city: string;
}
