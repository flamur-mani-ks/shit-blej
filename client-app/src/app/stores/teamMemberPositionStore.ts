import { observable, action, computed, runInAction } from 'mobx';
import { ITeamMemberPosition } from '../models/teamMemberPosition';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { toast } from 'react-toastify';

export default class TeamMemberPositionStore {
	rootStore: RootStore;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable teamMemberPositionRegistry = new Map();
	@observable teamMemberPositions: ITeamMemberPosition[] = [];
	@observable selectedTeamMemberPosition: ITeamMemberPosition | undefined;
	@observable loadingInitial = false;
	@observable editMode = false;
	@observable submitting = false;
	@observable target = '';

	@computed get teamMemberPositionsArr() {
		return Array.from(this.teamMemberPositionRegistry.values());
	}

	@action loadTeamMemberPositions = async () => {
		this.loadingInitial = true;
		try {
			const teamMemberPositions = await agent.TeamMemberPositions.list();
			runInAction('loading teamMemberPositions', () => {
				teamMemberPositions.forEach((teamMemberPosition) => {
					this.teamMemberPositionRegistry.set(teamMemberPosition.id, teamMemberPosition);
				});
				this.loadingInitial = false;
			});
		} catch (error) {
			runInAction('load teamMemberPositions error', () => {
				this.loadingInitial = false;
			});
		}
	};

	@action createTeamMemberPosition = async (teamMemberPosition: ITeamMemberPosition) => {
		this.submitting = true;
		try {
			await agent.TeamMemberPositions.create(teamMemberPosition);
			runInAction('create teamMemberPosition', () => {
				this.teamMemberPositionRegistry.set(teamMemberPosition.id, teamMemberPosition);
				this.editMode = false;
				this.submitting = false;
			});
			toast.success('Të dhënat u ruajtën me sukses')
		} catch (error) {
			runInAction('create teamMemberPosition error', () => {
				this.submitting = false;
			});
			console.log(error);
		}
	};

	@action editTeamMemberPosition = async (teamMemberPosition: ITeamMemberPosition) => {
		this.submitting = true;
		try {
			await agent.TeamMemberPositions.update(teamMemberPosition);
			runInAction('editing teamMemberPosition', () => {
				this.teamMemberPositionRegistry.set(teamMemberPosition.id, teamMemberPosition);
				this.selectedTeamMemberPosition = teamMemberPosition;
				this.editMode = false;
				this.submitting = false;
			});
			toast.success('Të dhënat u ruajtën me sukses')
		} catch (error) {
			runInAction('edit teamMemberPosition error', () => {
				this.submitting = false;
			});
			console.log(error);
		}
	};

	@action deleteTeamMemberPosition = async (
		id: string
	) => {
		this.submitting = true;
		try {
			await agent.TeamMemberPositions.delete(id);
			runInAction('deleting teamMemberPosition', () => {
				this.teamMemberPositionRegistry.delete(id);
				this.submitting = false;
			});
			toast.info('Të dhënat u fshinë me sukses')
		} catch (error) {
			runInAction('delete teamMemberPosition error', () => {
				this.submitting = false;
			});
			console.log(error);
		}
	};

	@action openCreateForm = () => {
		this.editMode = true;
		this.selectedTeamMemberPosition = undefined;
	};

	@action openEditForm = (id: string) => {
		this.selectedTeamMemberPosition = this.teamMemberPositionRegistry.get(id);
		this.editMode = true;
	};

	@action cancelSelectedTeamMemberPosition = () => {
		this.selectedTeamMemberPosition = undefined;
	};

	@action cancelFormOpen = () => {
		this.editMode = false;
	};

	@action selectTeamMemberPosition = (id: string) => {
		this.selectedTeamMemberPosition = this.teamMemberPositionRegistry.get(id);
		this.editMode = false;
	};
}

