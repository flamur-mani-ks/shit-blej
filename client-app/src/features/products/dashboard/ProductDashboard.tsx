import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ProductList from './ProductList';
import { observer } from 'mobx-react-lite';
import ProductStore from '../../../app/stores/productStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const ProductDashboard: React.FC = () => {
	const productStore = useContext(ProductStore);

	useEffect(() => {
		productStore.loadProducts();
	}, [productStore]);

	if (productStore.loadingInitial)
		return <LoadingComponent content='Loading products' />;
		
	return (
		<Grid>
			<Grid.Column width={10}>
				<ProductList />
			</Grid.Column>
			<Grid.Column width={6}>
				<h2>Product filters</h2>
			</Grid.Column>
		</Grid>
	);
};

export default observer(ProductDashboard);
