import { action, computed, observable, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import agent from '../api/agent';
import { IProduct } from '../models/product';

configure({ enforceActions: 'always' });

class ProductStore {
	@observable productRegistry = new Map();
	@observable products: IProduct[] = [];
	@observable loadingInitial = false;
	@observable selectedProduct: IProduct | undefined;
	@observable editMode = false;
	@observable submitting = false;
	@observable target = '';

	@computed get productsByDate() {
		return Array.from(this.productRegistry.values()).sort(
			(a, b) => Date.parse(b.date) - Date.parse(a.date)
		);
	}

	@action loadProducts = async () => {
		this.loadingInitial = true;
		try {
			const products = await agent.Products.list();
			runInAction('loading products', () => {
				products.forEach((product) => {
					product.date = product.date.split('.')[0];
					this.productRegistry.set(product.id, product);
				});
				this.loadingInitial = false;
			});
		} catch (error) {
			console.log(error);
			runInAction('load products error', () => {
				this.loadingInitial = false;
			});
		}
	};

	@action createProduct = async (product: IProduct) => {
		this.submitting = true;
		try {
			await agent.Products.create(product);
			runInAction('creating product', () => {
				this.productRegistry.set(product.id, product);
				this.editMode = false;
				this.submitting = false;
			});
		} catch (error) {
			console.log(error);
			runInAction('creating product error', () => {
				this.submitting = false;
			});
		}
	};

	@action editProduct = async (product: IProduct) => {
		this.submitting = true;
		try {
			await agent.Products.update(product);
			runInAction('edit product', () => {
				this.productRegistry.set(product.id, product);
				this.selectedProduct = product;
				this.editMode = false;
				this.submitting = false;
			});
		} catch (error) {
			console.log(error);
			runInAction('edit product error', () => {
				this.submitting = false;
			});
		}
	};

	@action deleteProduct = async (
		event: SyntheticEvent<HTMLButtonElement>,
		id: string
	) => {
		this.submitting = true;
		this.target = event.currentTarget.name;
		try {
			await agent.Products.delete(id);
			runInAction('delete product', () => {
				this.productRegistry.delete(id);
				this.submitting = false;
				this.target = '';
			});
		} catch (error) {
			console.log(error);
			runInAction('delete product error',() => {
				this.submitting = false;
				this.target = '';
			});
		}
	};

	@action openCreateForm = () => {
		this.editMode = true;
		this.selectedProduct = undefined;
	};

	@action openEditForm = (id: string) => {
		this.selectedProduct = this.productRegistry.get(id);
		this.editMode = true;
	};

	@action cancelSelectedProduct = () => {
		this.selectedProduct = undefined;
	};

	@action cancelFormOpen = () => {
		this.editMode = false;
	};

	@action selectProduct = (id: string) => {
		this.selectedProduct = this.productRegistry.get(id);
		this.editMode = false;
	};
}

export default createContext(new ProductStore());
