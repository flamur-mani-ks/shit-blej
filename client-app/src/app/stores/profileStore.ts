import { action, computed, observable, reaction, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import {
	IPhoto,
	IProfile,
	IUserBlog,
	IUserJob,
	IUserProduct,
} from '../models/profile';
import { RootStore } from './rootStore';

export default class ProfileStore {
	rootStore: RootStore;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;

		reaction(
			() => this.activeTab,
			(activeTab) => {
				if (activeTab === 5 || activeTab === 6) {
					const predicate = activeTab === 5 ? 'followers' : 'following';
					this.loadFollowings(predicate);
				} else {
					this.followings = [];
				}
			}
		);
	}

	@observable profile: IProfile | null = null;
	@observable loadingProfile = true;
	@observable uploadingPhoto = false;
	@observable loading = false;
	@observable userProducts: IUserProduct[] = [];
	@observable loadingProducts = false;

	@observable userJobs: IUserJob[] = [];
	@observable loadingJobs = false;

	@observable userBlogs: IUserBlog[] = [];
	@observable loadingBlogs = false;

	@observable userRegistry = new Map();
	@observable users: IProfile[] = [];
	@observable loadingUsers = false;

	@observable followings: IProfile[] = [];
	@observable activeTab: number = 0;

	@action setActiveTab = (activeIndex: number) => {
		this.activeTab = activeIndex;
	};

	@computed get isCurrentUser() {
		if (this.rootStore.userStore.user && this.profile) {
			return this.rootStore.userStore.user.username === this.profile.username;
		} else {
			return false;
		}
	}

	@computed get isCurrentUserAdmin() {
		if (this.rootStore.userStore.user && this.profile) {
			return (
				this.rootStore.userStore.user.username === this.profile.username &&
				this.rootStore.userStore.user.role === 'admin'
			);
		} else {
			return false;
		}
	}

	@computed get isAdmin() {
		if (this.rootStore.userStore.user && this.profile) {
			return this.rootStore.userStore.user.role === 'admin';
		} else {
			return false;
		}
	}

	@computed get isDefaultUser() {
		if (this.rootStore.userStore.user && this.profile) {
			return this.rootStore.userStore.user.role === 'user';
		} else {
			return false;
		}
	}

	@action loadUserProducts = async (username: string) => {
		this.loadingProducts = true;
		try {
			const products = await agent.Profiles.listProducts(username);
			runInAction(() => {
				this.userProducts = products;
				this.loadingProducts = false;
			});
		} catch (error) {
			toast.error('Problem loading products');
			runInAction(() => {
				this.loadingProducts = false;
			});
		}
	};

	@action loadUserJobs = async (username: string) => {
		this.loadingJobs = true;
		try {
			const jobs = await agent.Profiles.listJobs(username);
			runInAction(() => {
				this.userJobs = jobs;
				this.loadingJobs = false;
			});
		} catch (error) {
			toast.error('Problem loading jobs');
			runInAction(() => {
				this.loadingJobs = false;
			});
		}
	};

	@action loadUserBlogs = async (username: string) => {
		this.loadingBlogs = true;
		try {
			const blogs = await agent.Profiles.listBlogs(username);
			runInAction(() => {
				this.userBlogs = blogs;
				this.loadingBlogs = false;
			});
		} catch (error) {
			toast.error('Problem loading blogs');
			runInAction(() => {
				this.loadingBlogs = false;
			});
		}
	};

	@action loadUsers = async () => {
		this.loadingUsers = true;
		try {
			const users = await agent.Profiles.listAllProfiles();
			runInAction(() => {
				this.users = users;
				this.loadingUsers = false;
			});
		} catch (error) {
			toast.error('Problem loading users');
			runInAction(() => {
				this.loadingUsers = false;
			});
		}
	};

	@action loadProfile = async (username: string) => {
		this.loadingProfile = true;
		try {
			const profile = await agent.Profiles.get(username);
			runInAction(() => {
				this.profile = profile;
				this.loadingProfile = false;
			});
		} catch (error) {
			runInAction(() => {
				this.loadingProfile = false;
			});
			console.log(error);
		}
	};

	@action deleteUser = async (username: string) => {
		this.loading = true;
		try {
			await agent.Profiles.deleteProfile(username);
			runInAction(() => {
				this.users = this.users.filter((a) => a.username !== username);
			});
			toast.info('T?? dh??nat u fshin?? me sukses');
		} catch (error) {
			toast.error('Problem deleting the user');
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	@action uploadPhoto = async (file: Blob) => {
		this.uploadingPhoto = true;
		try {
			const photo = await agent.Profiles.uploadPhoto(file);
			runInAction(() => {
				if (this.profile) {
					this.profile.photos.push(photo);
					if (photo.isMain && this.rootStore.userStore.user) {
						this.rootStore.userStore.user.image = photo.url;
						this.profile.image = photo.url;
					}
				}
				this.uploadingPhoto = false;
			});
			toast.success('T?? dh??nat u ruajt??n me sukses');
		} catch (error) {
			console.log(error);
			toast.error('Problem uploading photo');
			runInAction(() => {
				this.uploadingPhoto = false;
			});
		}
	};

	@action setMainPhoto = async (photo: IPhoto) => {
		this.loading = true;
		try {
			await agent.Profiles.setMainPhoto(photo.id);
			runInAction(() => {
				this.rootStore.userStore.user!.image = photo.url;
				this.profile!.photos.find((a) => a.isMain)!.isMain = false;
				this.profile!.photos.find((a) => a.id === photo.id)!.isMain = true;
				this.profile!.image = photo.url;
				this.loading = false;
			});
		} catch (error) {
			toast.error('Problem setting photo as main');
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	@action deletePhoto = async (photo: IPhoto) => {
		this.loading = true;
		try {
			await agent.Profiles.deletePhoto(photo.id);
			runInAction(() => {
				this.profile!.photos = this.profile!.photos.filter(
					(a) => a.id !== photo.id
				);
				this.loading = false;
			});
			toast.info('T?? dh??nat u fshin?? me sukses');
		} catch (error) {
			toast.error('Problem deleting the photo');
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	@action updateProfile = async (profile: Partial<IProfile>) => {
		try {
			await agent.Profiles.updateProfile(profile);
			runInAction(() => {
				if (
					profile.displayName !== this.rootStore.userStore.user!.displayName
				) {
					this.rootStore.userStore.user!.displayName = profile.displayName!;
				}
				this.profile = { ...this.profile!, ...profile };
			});
		} catch (error) {
			toast.error('Problem updating profile');
		}
	};

	@action follow = async (username: string) => {
		this.loading = true;
		try {
			await agent.Profiles.follow(username);
			runInAction(() => {
				this.profile!.following = true;
				this.profile!.followersCount++;
				this.loading = false;
			});
		} catch (error) {
			toast.error('Problem following user');
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	@action unfollow = async (username: string) => {
		this.loading = true;
		try {
			await agent.Profiles.unfollow(username);
			runInAction(() => {
				this.profile!.following = false;
				this.profile!.followersCount--;
				this.loading = false;
			});
		} catch (error) {
			toast.error('Problem unfollowing user');
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	@action loadFollowings = async (predicate: string) => {
		this.loading = true;
		try {
			const profiles = await agent.Profiles.listFollowings(
				this.profile!.username,
				predicate
			);
			runInAction(() => {
				this.followings = profiles;
				this.loading = false;
			});
		} catch (error) {
			toast.error('Problem loading followings');
			runInAction(() => {
				this.loading = false;
			});
		}
	};
}
