export interface IBlog {
	id: string;
	title: string;
	body: string;
	category: string;
  date: Date;
	isOwner: boolean;
	attendees: IAttendee[];
}

export interface IBlogFormValues extends Partial<IBlog> {
  time?: Date;
}

export class BlogFormValues implements IBlogFormValues {
	id?: string = undefined;
	title: string = '';
	body: string = '';
	category: string = '';
	date?: Date = undefined;
	time?: Date = undefined;

	constructor(init?: IBlogFormValues) {
    if(init && init.date){
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