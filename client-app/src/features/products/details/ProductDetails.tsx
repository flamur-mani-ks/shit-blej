import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ProductDetailedHeader from './ProductDetailedHeader';
import ProductDetailedInfo from './ProductDetailedInfo';
import ProductDetailedSidebar from './ProductDetailedSidebar';

interface DetailParams {
	id: string;
}

const ProductDetails: React.FC<RouteComponentProps<DetailParams>> = ({
	match
}) => {
	const rootStore = useContext(RootStoreContext);
	const {
		product,
		loadProduct,
		loadingInitial,
	} = rootStore.productStore;

	useEffect(() => {
		loadProduct(match.params.id);
	}, [loadProduct, match.params.id]);

	if(loadingInitial) return <LoadingComponent content='Loading product...' />

	if(!product)
		return <h2>Product not found</h2>

	return (
		<Grid>
			<Grid.Column width={10}>
				<ProductDetailedHeader product={product} />
				<ProductDetailedInfo product={product} />
			</Grid.Column>
			<Grid.Column width={6}>
				<ProductDetailedSidebar attendees={product.attendees}  />
			</Grid.Column>
		</Grid>
	);
};

export default observer(ProductDetails);
