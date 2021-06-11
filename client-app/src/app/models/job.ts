export interface IJob {
	id: string;
	title: string;
	description: string;
	category: string;
	workingHours: string;
	city: string;
	createdAt: Date;
  expiresAt: Date;
	isOwner: boolean;
	attendees: IAttendee[];
}

export interface IJobFormValues extends Partial<IJob> {
  time?: Date;
}

export class JobFormValues implements IJobFormValues {
	id?: string = undefined;
	title: string = '';
	category: string = '';
	description: string = '';
	createdAt?: Date = undefined;
  expiresAt?: Date = undefined;
	time?: Date = undefined;
	city: string = '';
	workingHours?: string = undefined;

	constructor(init?: IJobFormValues) {
    if(init && init.expiresAt){
      init.time = init.expiresAt;
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