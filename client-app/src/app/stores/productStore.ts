import { action, computed, observable, reaction, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { toast } from 'react-toastify';
import { history } from '../..';
import agent from '../api/agent';
import { createAttendee } from '../common/util/util';
import { IProduct } from '../models/product';
import { RootStore } from './rootStore';

const LIMIT = 50;

export default class ProductStore {
	rootStore: RootStore;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;

		reaction(
			() => this.predicate.keys(),
			() => {
				this.page = 0;
				this.productRegistry.clear();
				this.loadProducts();
			}
		)
	}

	@observable productRegistry = new Map();
	@observable loadingInitial = false;
	@observable product: IProduct | null = null;
	@observable submitting = false;
	@observable target = '';
	@observable productCount = 0;
	@observable page = 0;
	@observable predicate = new Map();

	@action setPredicate = (predicate: string, value: string) => {
		this.predicate.clear();
		if (predicate !== 'all') {
			this.predicate.set(predicate, value);
		}
	};

	@computed get axiosParams() {
		const params = new URLSearchParams();
		params.append('limit', String(LIMIT));
		params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
		this.predicate.forEach((value, key) => {
			params.append(key, value);
		});
		return params;
	}

	@computed get productsByDate() {
		return Array.from(this.productRegistry.values()).sort(
			(a, b) => b.date!.getTime() - a.date!.getTime()
		);
	}

	@computed get totalPages() {
		return Math.ceil(this.productCount / LIMIT);
	}

	@action setPage = (page: number) => {
		this.page = page;
	};

	@action loadProducts = async () => {
		this.loadingInitial = true;
		const user = this.rootStore.userStore.user!;
		try {
			const productsEnvelope = await agent.Products.list(this.axiosParams);
			const { products, productCount } = productsEnvelope;
			runInAction('loading products', () => {
				products.forEach((product) => {
					product.date = new Date(product.date);
					if (user) {
						product.isOwner = product.attendees.some(
							(a) => a.username === user.username && a.isOwner
						);
					} else {
						product.isOwner = false;
					}
					this.productRegistry.set(product.id, product);
				});
				this.productCount = productCount;
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
		const user = this.rootStore.userStore.user!;
		if (product) {
			this.product = product;
			return product;
		} else {
			this.loadingInitial = true;
			try {
				product = await agent.Products.details(id);
				runInAction('getting single product', () => {
					product.date = new Date(product.date);
					if (user) {
						product.isOwner = product.attendees.some(
							(a: any) => a.username === user.username && a.isOwner
						);
					} else {
						product.isOwner = false;
					}
					this.product = product;
					this.productRegistry.set(product.id, product);
					this.loadingInitial = false;
				});
				return product;
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
	};

	@action createProduct = async (product: IProduct) => {
		this.submitting = true;
		try {
			await agent.Products.create(product);
			const attendee = createAttendee(this.rootStore.userStore.user!);
			let attendees = [];
			attendees.push(attendee);
			product.attendees = attendees;
			runInAction('creating product', () => {
				this.productRegistry.set(product.id, product);
				this.submitting = false;
			});
			history.push(`/products/${product.id}`);
			toast.success('T?? dh??nat u ruajt??n me sukses');
		} catch (error) {
			console.log(error.response);
			toast.error('Problem n?? ruajtjen e t?? dh??nave');
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
			history.push(`/products/${product.id}`);
			toast.success('T?? dh??nat u ruajt??n me sukses');
		} catch (error) {
			console.log(error.response);
			toast.error('Problem n?? ruajtjen e ndryshimeve');
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
			toast.info('T?? dh??nat u fshin?? me sukses');
		} catch (error) {
			console.log(error);
			runInAction('delete product error', () => {
				this.submitting = false;
				this.target = '';
			});
		}
	};

	@action deleteProductFromAdmin = async (
		id: string
	) => {
		this.submitting = true;
		try {
			await agent.Products.delete(id);
			runInAction('delete product', () => {
				this.productRegistry.delete(id);
				this.submitting = false;
			});
			toast.info('T?? dh??nat u fshin?? me sukses');
		} catch (error) {
			console.log(error);
			runInAction('delete product error', () => {
				this.submitting = false;
			});
		}
	};
}
