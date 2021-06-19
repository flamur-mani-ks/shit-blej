import { action, computed, observable, runInAction } from 'mobx';
import {SyntheticEvent } from 'react';
import { toast } from 'react-toastify';
import { history } from '../..';
import agent from '../api/agent';
import { createAttendee } from '../common/util/util';
import { IJob } from '../models/job';
import { RootStore } from './rootStore';


export default class JobStore {
	rootStore: RootStore;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable jobRegistry = new Map();
	@observable loadingInitial = false;
	@observable job: IJob | null = null;
	@observable submitting = false;
	@observable target = '';

	@computed get jobsByDate() {
		return Array.from(this.jobRegistry.values()).sort(
			(a, b) => b.createdAt!.getTime() - a.createdAt!.getTime()
		);
	}

	// @computed get jobsByDate() {
	// 	return this.groupJobsByCategory(Array.from(this.jobRegistry.values()));
	// }

	// helper function for grouping jobs by category
	// groupJobsByCategory (jobs: IJob[]){
	// 	return Object.entries(jobs.reduce((jobs, job) => {
	// 		const category = job.category;
	// 		jobs[category] = jobs[category] ? [...jobs[category], job] : [job];
	// 		return jobs;
	// 	}, {} as {[key: string]: IJob[]}));
	// }

	@action loadJobs = async () => {
		this.loadingInitial = true;
		const user = this.rootStore.userStore.user!;
		try {
			const jobs = await agent.Jobs.list();
			runInAction('loading jobs', () => {
				jobs.forEach((job) => {
					job.createdAt = new Date(job.createdAt);
          job.expiresAt = new Date(job.expiresAt);
					if(user){
					job.isOwner = job.attendees.some(
						a => a.username === user.username && a.isOwner
					)
					}else{
						job.isOwner = false;
					}
					this.jobRegistry.set(job.id, job);
				});
				this.loadingInitial = false;
			});
		} catch (error) {
			console.log(error);
			runInAction('load jobs error', () => {
				this.loadingInitial = false;
			});
		}
	};

	@action loadJob = async (id: string) => {
		let job = this.getJob(id);
		const user = this.rootStore.userStore.user!;
		if (job) {
			this.job = job;
			return job;
		} else {
			this.loadingInitial = true;
			try {
				job = await agent.Jobs.details(id);
				runInAction('getting single job', () => {
					job.createdAt = new Date(job.createdAt);
					job.expiresAt = new Date(job.expiresAt);
					if(user){
						job.isOwner = job.attendees.some(
							(a: any) => a.username === user.username && a.isOwner
						)
						}else{
							job.isOwner = false;
						}
					this.job = job;
					this.jobRegistry.set(job.id, job);
					this.loadingInitial = false;
				});
				return job;
			} catch (error) {
				console.log(error);
				runInAction('get single job error', () => {
					this.loadingInitial = false;
				});
			}
		}
	};

	// helper function for getting single job
	getJob = (id: string) => {
		return this.jobRegistry.get(id);
	};

	@action clearJob = () => {
		this.job = null;
	};

	@action createJob = async (job: IJob) => {
		this.submitting = true;
		try {
			await agent.Jobs.create(job);
			const attendee = createAttendee(this.rootStore.userStore.user!);
			let attendees = [];
			attendees.push(attendee);
			job.attendees = attendees;
			runInAction('creating job', () => {
				this.jobRegistry.set(job.id, job);
				this.submitting = false;
			});
			history.push(`/jobs/${job.id}`);
		} catch (error) {
			console.log(error.response);
			toast.error('Problem në ruajtjen e të dhënave');
			runInAction('creating job error', () => {
				this.submitting = false;
			});
		}
	};

	@action editJob = async (job: IJob) => {
		this.submitting = true;
		try {
			await agent.Jobs.update(job);
			runInAction('edit job', () => {
				this.jobRegistry.set(job.id, job);
				this.job = job;
				this.submitting = false;
			});
			history.push(`/jobs/${job.id}`);
		} catch (error) {
			console.log(error.response);
			toast.error('Problem në ruajtjen e ndryshimeve');
			runInAction('edit job error', () => {
				this.submitting = false;
			});
		}
	};

	@action deleteJob = async (
		event: SyntheticEvent<HTMLButtonElement>,
		id: string
	) => {
		this.submitting = true;
		this.target = event.currentTarget.name;
		try {
			await agent.Jobs.delete(id);
			runInAction('delete job', () => {
				this.jobRegistry.delete(id);
				this.submitting = false;
				this.target = '';
			});
			
		} catch (error) {
			console.log(error);
			runInAction('delete job error', () => {
				this.submitting = false;
				this.target = '';
			});
		}
	};

	@action deleteJobFromAdmin = async (
		id: string
	) => {
		this.submitting = true;
		try {
			await agent.Jobs.delete(id);
			runInAction('delete job', () => {
				this.jobRegistry.delete(id);
				this.submitting = false;
			});
			
		} catch (error) {
			console.log(error);
			runInAction('delete job error', () => {
				this.submitting = false;
			});
		}
	};
}