export interface ICity {
	id: string;
	cityName: string;
}

export class CityFormValues {
	id?: string = undefined;
	cityName: string = '';
}