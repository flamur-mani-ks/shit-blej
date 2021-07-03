import { observable, action, computed, runInAction } from 'mobx';
import { IProductCategory } from '../models/productCategory';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { toast } from 'react-toastify';

export default class ProductCategoryStore {
	rootStore: RootStore;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable productCategoryRegistry = new Map();
	@observable productCategories: IProductCategory[] = [];
	@observable selectedProductCategory: IProductCategory | undefined;
	@observable loadingInitial = false;
	@observable editMode = false;
	@observable submitting = false;
	@observable target = '';

	@computed get productCategoriesArr() {
		return Array.from(this.productCategoryRegistry.values());
	}

	@action loadProductCategories = async () => {
		this.loadingInitial = true;
		try {
			const productCategories = await agent.ProductCategories.list();
			runInAction('loading productCategories', () => {
				productCategories.forEach((productCategory) => {
					this.productCategoryRegistry.set(productCategory.id, productCategory);
				});
				this.loadingInitial = false;
			});
		} catch (error) {
			runInAction('load productCategories error', () => {
				this.loadingInitial = false;
			});
		}
	};

	@action createProductCategory = async (productCategory: IProductCategory) => {
		this.submitting = true;
		try {
			await agent.ProductCategories.create(productCategory);
			runInAction('create productCategory', () => {
				this.productCategoryRegistry.set(productCategory.id, productCategory);
				this.editMode = false;
				this.submitting = false;
			});
			toast.success('Të dhënat u ruajtën me sukses');
		} catch (error) {
			runInAction('create productCategory error', () => {
				this.submitting = false;
			});
			console.log(error);
		}
	};

	@action editProductCategory = async (productCategory: IProductCategory) => {
		this.submitting = true;
		try {
			await agent.ProductCategories.update(productCategory);
			runInAction('editing productCategory', () => {
				this.productCategoryRegistry.set(productCategory.id, productCategory);
				this.selectedProductCategory = productCategory;
				this.editMode = false;
				this.submitting = false;
			});
			toast.success('Të dhënat u ruajtën me sukses');
		} catch (error) {
			runInAction('edit productCategory error', () => {
				this.submitting = false;
			});
			console.log(error);
		}
	};

	@action deleteProductCategory = async (
		id: string
	) => {
		this.submitting = true;
		try {
			await agent.ProductCategories.delete(id);
			runInAction('deleting productCategory', () => {
				this.productCategoryRegistry.delete(id);
				this.submitting = false;
			});
			toast.info('Të dhënat u fshinë me sukses');
		} catch (error) {
			runInAction('delete productCategory error', () => {
				this.submitting = false;
			});
			console.log(error);
		}
	};

	@action openCreateForm = () => {
		this.editMode = true;
		this.selectedProductCategory = undefined;
	};

	@action openEditForm = (id: string) => {
		this.selectedProductCategory = this.productCategoryRegistry.get(id);
		this.editMode = true;
	};

	@action cancelSelectedProductCategory = () => {
		this.selectedProductCategory = undefined;
	};

	@action cancelFormOpen = () => {
		this.editMode = false;
	};

	@action selectProductCategory = (id: string) => {
		this.selectedProductCategory = this.productCategoryRegistry.get(id);
		this.editMode = false;
	};
}
