import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ProductDashboard from '../../features/products/dashboard/ProductDashboard';
import LoadingComponent from './LoadingComponent';
import ProductStore from '../stores/productStore';
import { observer } from 'mobx-react-lite';

const App = () => {
	const productStore = useContext(ProductStore);

	useEffect(() => {
		productStore.loadProducts();
	}, [productStore]);

	if (productStore.loadingInitial)
		return <LoadingComponent content='Loading products' />;

	return (
		<Fragment>
			<NavBar />
			<Container style={{ marginTop: '7em' }}>
				<ProductDashboard />
			</Container>
		</Fragment>
	);
};

export default observer(App);
