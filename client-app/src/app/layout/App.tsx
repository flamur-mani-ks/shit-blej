import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react';
import { IProduct } from '../models/product';
import NavBar from '../../features/nav/NavBar';
import ProductDashboard from '../../features/products/dashboard/ProductDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

const App = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
	const [editMode, setEditMode] = useState(false);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [target, setTarget] = useState('');

	const handleOpenCreateForm = () => {
		setSelectedProduct(null);
		setEditMode(true);
	};

	const handleCreateProduct = (product: IProduct) => {
		setSubmitting(true);
		agent.Products.create(product)
			.then(() => {
				setProducts([...products, product]);
				setSelectedProduct(product);
				setEditMode(false);
			})
			.then(() => setSubmitting(false));
	};

	const handleEditProduct = (product: IProduct) => {
		setSubmitting(true);
		agent.Products.update(product)
			.then(() => {
				setProducts([...products.filter((a) => a.id !== product.id), product]);
				setSelectedProduct(product);
				setEditMode(false);
			})
			.then(() => setSubmitting(false));
	};

	const handleDeleteProduct = (
		event: SyntheticEvent<HTMLButtonElement>,
		id: string
	) => {
		setSubmitting(true);
		setTarget(event.currentTarget.name);
		agent.Products.delete(id)
			.then(() => {
				setProducts([...products.filter((a) => a.id !== id)]);
			})
			.then(() => setSubmitting(false));
	};

	const handleSelectProduct = (id: string) => {
		setSelectedProduct(products.filter((a) => a.id === id)[0]);
		setEditMode(false);
	};

	useEffect(() => {
		agent.Products.list()
			.then((response) => {
				let products: IProduct[] = [];
				response.forEach((product) => {
					product.date = product.date.split('.')[0];
					products.push(product);
				});
				setProducts(products);
			})
			.then(() => setLoading(false));
	}, []);

	if (loading) return <LoadingComponent content='Loading products' />;

	return (
		<Fragment>
			<NavBar openCreateForm={handleOpenCreateForm} />
			<Container style={{ marginTop: '7em' }}>
				<ProductDashboard
					products={products}
					selectProduct={handleSelectProduct}
					selectedProduct={selectedProduct}
					editMode={editMode}
					setEditMode={setEditMode}
					setSelectedProduct={setSelectedProduct}
					createProduct={handleCreateProduct}
					editProduct={handleEditProduct}
					deleteProduct={handleDeleteProduct}
					submitting={submitting}
					target={target}
				/>
			</Container>
		</Fragment>
	);
};

export default App;
