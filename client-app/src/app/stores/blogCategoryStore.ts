import { observable, action, computed, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IBlogCategory } from '../models/blogCategory';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { toast } from 'react-toastify';

export default class BlogCategoryStore {
	rootStore: RootStore;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable blogCategoryRegistry = new Map();
	@observable blogCategories: IBlogCategory[] = [];
	@observable selectedBlogCategory: IBlogCategory | undefined;
	@observable loadingInitial = false;
	@observable editMode = false;
	@observable submitting = false;
	@observable target = '';

	@computed get blogCategoriesArr() {
		return Array.from(this.blogCategoryRegistry.values());
	}

	@action loadBlogCategories = async () => {
		this.loadingInitial = true;
		try {
			const blogCategories = await agent.BlogCategories.list();
			runInAction('loading blogCategories', () => {
				blogCategories.forEach((blogCategory) => {
					this.blogCategoryRegistry.set(blogCategory.id, blogCategory);
				});
				this.loadingInitial = false;
			});
		} catch (error) {
			runInAction('load blogCategories error', () => {
				this.loadingInitial = false;
			});
		}
	};

	@action createBlogCategory = async (blogCategory: IBlogCategory) => {
		this.submitting = true;
		try {
			await agent.BlogCategories.create(blogCategory);
			runInAction('create blogCategory', () => {
				this.blogCategoryRegistry.set(blogCategory.id, blogCategory);
				this.editMode = false;
				this.submitting = false;
			});
			toast.success('Të dhënat u ruajtën me sukses')
		} catch (error) {
			runInAction('create blogCategory error', () => {
				this.submitting = false;
			});
			console.log(error);
		}
	};

	@action editBlogCategory = async (blogCategory: IBlogCategory) => {
		this.submitting = true;
		try {
			await agent.BlogCategories.update(blogCategory);
			runInAction('editing blogCategory', () => {
				this.blogCategoryRegistry.set(blogCategory.id, blogCategory);
				this.selectedBlogCategory = blogCategory;
				this.editMode = false;
				this.submitting = false;
			});
			toast.success('Të dhënat u ruajtën me sukses')
		} catch (error) {
			runInAction('edit blogCategory error', () => {
				this.submitting = false;
			});
			console.log(error);
		}
	};

	@action deleteBlogCategory = async (
		id: string
	) => {
		this.submitting = true;
		try {
			await agent.BlogCategories.delete(id);
			runInAction('deleting blogCategory', () => {
				this.blogCategoryRegistry.delete(id);
				this.submitting = false;
			});
			toast.info('Të dhënat u fshinë me sukses')
		} catch (error) {
			runInAction('delete blogCategory error', () => {
				this.submitting = false;
			});
			console.log(error);
		}
	};

	@action openCreateForm = () => {
		this.editMode = true;
		this.selectedBlogCategory = undefined;
	};

	@action openEditForm = (id: string) => {
		this.selectedBlogCategory = this.blogCategoryRegistry.get(id);
		this.editMode = true;
	};

	@action cancelSelectedBlogCategory = () => {
		this.selectedBlogCategory = undefined;
	};

	@action cancelFormOpen = () => {
		this.editMode = false;
	};

	@action selectBlogCategory = (id: string) => {
		this.selectedBlogCategory = this.blogCategoryRegistry.get(id);
		this.editMode = false;
	};
}

