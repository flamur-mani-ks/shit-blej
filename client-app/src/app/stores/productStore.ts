import { action, computed, observable, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import agent from '../api/agent';
import { IProduct } from '../models/product';

configure({ enforceActions: 'always' });

class ProductStore {
	@observable productRegistry = new Map();
	@observable loadingInitial = false;
	@observable product: IProduct | null = null;
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

	@action loadProduct = async (id: string) => {
		let product = this.getProduct(id);
		if (product) {
			this.product = product;
		} else {
			this.loadingInitial = true;
			try {
				product = await agent.Products.details(id);
				runInAction('getting single product', () => {
					this.product = product;
					this.loadingInitial = false;
				});
			} catch (error) {
				console.log(error);
				runInAction('get single product error', () => {
					this.loadingInitial = false;
				});
			}
		}
	};

	// helper function for getting single product
	getProduct = (id: string) => {
		return this.productRegistry.get(id);
	};

	@action clearProduct = () => {
		this.product = null;
	}

	@action createProduct = async (product: IProduct) => {
		this.submitting = true;
		try {
			await agent.Products.create(product);
			runInAction('creating product', () => {
				this.productRegistry.set(product.id, product);
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
				this.product = product;
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
			runInAction('delete product error', () => {
				this.submitting = false;
				this.target = '';
			});
		}
	};

}

export default createContext(new ProductStore());
