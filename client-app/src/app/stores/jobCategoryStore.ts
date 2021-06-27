import { observable, action, computed, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IJobCategory } from '../models/jobCategory';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { toast } from 'react-toastify';

export default class JobCategoryStore {
	rootStore: RootStore;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable jobCategoryRegistry = new Map();
	@observable jobCategories: IJobCategory[] = [];
	@observable selectedJobCategory: IJobCategory | undefined;
	@observable loadingInitial = false;
	@observable editMode = false;
	@observable submitting = false;
	@observable target = '';

	@computed get jobCategoriesArr() {
		return Array.from(this.jobCategoryRegistry.values());
	}

	@action loadJobCategories = async () => {
		this.loadingInitial = true;
		try {
			const jobCategories = await agent.JobCategories.list();
			runInAction('loading jobCategories', () => {
				jobCategories.forEach((jobCategory) => {
					this.jobCategoryRegistry.set(jobCategory.id, jobCategory);
				});
				this.loadingInitial = false;
			});
		} catch (error) {
			runInAction('load jobCategories error', () => {
				this.loadingInitial = false;
			});
		}
	};

	@action createJobCategory = async (jobCategory: IJobCategory) => {
		this.submitting = true;
		try {
			await agent.JobCategories.create(jobCategory);
			runInAction('create jobCategory', () => {
				this.jobCategoryRegistry.set(jobCategory.id, jobCategory);
				this.editMode = false;
				this.submitting = false;
			});
			toast.success('Të dhënat u ruajtën me sukses');
		} catch (error) {
			runInAction('create jobCategory error', () => {
				this.submitting = false;
			});
			console.log(error);
		}
	};

	@action editJobCategory = async (jobCategory: IJobCategory) => {
		this.submitting = true;
		try {
			await agent.JobCategories.update(jobCategory);
			runInAction('editing jobCategory', () => {
				this.jobCategoryRegistry.set(jobCategory.id, jobCategory);
				this.selectedJobCategory = jobCategory;
				this.editMode = false;
				this.submitting = false;
			});
			toast.success('Të dhënat u ruajtën me sukses');
		} catch (error) {
			runInAction('edit jobCategory error', () => {
				this.submitting = false;
			});
			console.log(error);
		}
	};

	@action deleteJobCategory = async (
		event: SyntheticEvent<HTMLButtonElement>,
		id: string
	) => {
		this.submitting = true;
		this.target = event.currentTarget.name;
		try {
			await agent.JobCategories.delete(id);
			runInAction('deleting jobCategory', () => {
				this.jobCategoryRegistry.delete(id);
				this.submitting = false;
				this.target = '';
			});
			toast.info('Të dhënat u fshinë me sukses');
		} catch (error) {
			runInAction('delete jobCategory error', () => {
				this.submitting = false;
				this.target = '';
			});
			console.log(error);
		}
	};

	@action openCreateForm = () => {
		this.editMode = true;
		this.selectedJobCategory = undefined;
	};

	@action openEditForm = (id: string) => {
		this.selectedJobCategory = this.jobCategoryRegistry.get(id);
		this.editMode = true;
	};

	@action cancelSelectedJobCategory = () => {
		this.selectedJobCategory = undefined;
	};

	@action cancelFormOpen = () => {
		this.editMode = false;
	};

	@action selectJobCategory = (id: string) => {
		this.selectedJobCategory = this.jobCategoryRegistry.get(id);
		this.editMode = false;
	};
}
