import { action, observable, reaction, runInAction } from 'mobx';
import { RootStore } from './rootStore';
import { ICity } from '../models/city';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { SyntheticEvent } from 'react';

export default class CommonStore {
	rootStore: RootStore;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;

		reaction(
			() => this.token,
			(token) => {
				if (token) {
					window.localStorage.setItem('jwt', token);
				} else {
					window.localStorage.removeItem('jwt');
				}
			}
		);
	}

	@observable token: string | null = window.localStorage.getItem('jwt');
	@observable appLoaded = false;

	@action setToken = (token: string | null) => {
		this.token = token;
	};

	@action setAppLoaded = () => {
		this.appLoaded = true;
	};
}
