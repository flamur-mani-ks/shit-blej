import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { ICity } from '../models/city';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { toast } from 'react-toastify';

export default class CityStore {
	rootStore: RootStore;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable cityRegistry = new Map();
	@observable cities: ICity[] = [];
	@observable selectedCity: ICity | undefined;
	@observable loadingInitial = false;
	@observable editMode = false;
	@observable submitting = false;
	@observable target = '';

	@computed get citiesByDate() {
		return Array.from(this.cityRegistry.values());
	}

	@action loadCities = async () => {
		this.loadingInitial = true;
		try {
			const cities = await agent.Cities.list();
			runInAction('loading cities', () => {
				cities.forEach((city) => {
					this.cityRegistry.set(city.id, city);
				});
				this.loadingInitial = false;
			});
		} catch (error) {
			runInAction('load cities error', () => {
				this.loadingInitial = false;
			});
		}
	};

	@action createCity = async (city: ICity) => {
		this.submitting = true;
		try {
			await agent.Cities.create(city);
			runInAction('create city', () => {
				this.cityRegistry.set(city.id, city);
				this.editMode = false;
				this.submitting = false;
			});
			toast.success('Të dhënat u ruajtën me sukses')
		} catch (error) {
			runInAction('create city error', () => {
				this.submitting = false;
			});
			console.log(error);
		}
	};

	@action editCity = async (city: ICity) => {
		this.submitting = true;
		try {
			await agent.Cities.update(city);
			runInAction('editing city', () => {
				this.cityRegistry.set(city.id, city);
				this.selectedCity = city;
				this.editMode = false;
				this.submitting = false;
			});
			toast.success('Të dhënat u ruajtën me sukses')
		} catch (error) {
			runInAction('edit city error', () => {
				this.submitting = false;
			});
			console.log(error);
		}
	};

	@action deleteCity = async (
		event: SyntheticEvent<HTMLButtonElement>,
		id: string
	) => {
		this.submitting = true;
		this.target = event.currentTarget.name;
		try {
			await agent.Cities.delete(id);
			runInAction('deleting city', () => {
				this.cityRegistry.delete(id);
				this.submitting = false;
				this.target = '';
			});
			toast.info('Të dhënat u fshinë me sukses')
		} catch (error) {
			runInAction('delete city error', () => {
				this.submitting = false;
				this.target = '';
			});
			console.log(error);
		}
	};

	@action openCreateForm = () => {
		this.editMode = true;
		this.selectedCity = undefined;
	};

	@action openEditForm = (id: string) => {
		this.selectedCity = this.cityRegistry.get(id);
		this.editMode = true;
	};

	@action cancelSelectedCity = () => {
		this.selectedCity = undefined;
	};

	@action cancelFormOpen = () => {
		this.editMode = false;
	};

	@action selectCity = (id: string) => {
		this.selectedCity = this.cityRegistry.get(id);
		this.editMode = false;
	};
}

