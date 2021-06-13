export interface IContact {
	id: string;
	fullName: string;
  email: string;
	message: string;
	phoneNumber?: string;
	city?: string;
	date: Date;
}

export interface IContactFormValues extends Partial<IContact> {
	time?: Date;
}

export class ContactFormValues implements IContactFormValues {
	id?: string = undefined;
	fullName: string = '';
  email: string = '';
	message: string = '';
	phoneNumber: string = '';
	date?: Date = undefined;
	time?: Date = undefined;
	city: string = '';

	constructor(init?: IContactFormValues) {
		if (init && init.date) {
			init.time = init.date;
		}
		Object.assign(this, init);
	}
}