import { observable, action, computed, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { ITeamMember } from '../models/teamMember';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { toast } from 'react-toastify';

export default class TeamMemberStore {
	rootStore: RootStore;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable teamMemberRegistry = new Map();
	@observable teamMembers: ITeamMember[] = [];
	@observable selectedTeamMember: ITeamMember | undefined;
	@observable loadingInitial = false;
	@observable editMode = false;
	@observable submitting = false;
	@observable target = '';

	@computed get teamMembersArr() {
		return Array.from(this.teamMemberRegistry.values());
	}

	@action loadTeamMembers = async () => {
		this.loadingInitial = true;
		try {
			const teamMembers = await agent.TeamMembers.list();
			runInAction('loading teamMembers', () => {
				teamMembers.forEach((teamMember) => {
					this.teamMemberRegistry.set(teamMember.id, teamMember);
				});
				this.loadingInitial = false;
			});
		} catch (error) {
			runInAction('load teamMembers error', () => {
				this.loadingInitial = false;
			});
		}
	};

	@action createTeamMember = async (teamMember: ITeamMember) => {
		this.submitting = true;
		try {
			await agent.TeamMembers.create(teamMember);
			runInAction('create teamMember', () => {
				this.teamMemberRegistry.set(teamMember.id, teamMember);
				this.editMode = false;
				this.submitting = false;
			});
			toast.success('Të dhënat u ruajtën me sukses')
		} catch (error) {
			runInAction('create teamMember error', () => {
				this.submitting = false;
			});
			console.log(error);
		}
	};

	@action editTeamMember = async (teamMember: ITeamMember) => {
		this.submitting = true;
		try {
			await agent.TeamMembers.update(teamMember);
			runInAction('editing teamMember', () => {
				this.teamMemberRegistry.set(teamMember.id, teamMember);
				this.selectedTeamMember = teamMember;
				this.editMode = false;
				this.submitting = false;
			});
			toast.success('Të dhënat u ruajtën me sukses')
		} catch (error) {
			runInAction('edit teamMember error', () => {
				this.submitting = false;
			});
			console.log(error);
		}
	};

	@action deleteTeamMember = async (
		event: SyntheticEvent<HTMLButtonElement>,
		id: string
	) => {
		this.submitting = true;
		this.target = event.currentTarget.name;
		try {
			await agent.TeamMembers.delete(id);
			runInAction('deleting teamMember', () => {
				this.teamMemberRegistry.delete(id);
				this.submitting = false;
				this.target = '';
			});
			toast.info('Të dhënat u fshinë me sukses')
		} catch (error) {
			runInAction('delete teamMember error', () => {
				this.submitting = false;
				this.target = '';
			});
			console.log(error);
		}
	};

	@action openCreateForm = () => {
		this.editMode = true;
		this.selectedTeamMember = undefined;
	};

	@action openEditForm = (id: string) => {
		this.selectedTeamMember = this.teamMemberRegistry.get(id);
		this.editMode = true;
	};

	@action cancelSelectedTeamMember = () => {
		this.selectedTeamMember = undefined;
	};

	@action cancelFormOpen = () => {
		this.editMode = false;
	};

	@action selectTeamMember = (id: string) => {
		this.selectedTeamMember = this.teamMemberRegistry.get(id);
		this.editMode = false;
	};
}

