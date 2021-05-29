import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ProductStore from '../../../app/stores/productStore';
import ProductDetailedHeader from './ProductDetailedHeader';
import ProductDetailedInfo from './ProductDetailedInfo';
import ProductDetailedSidebar from './ProductDetailedSidebar';

interface DetailParams {
	id: string;
}

const ProductDetails: React.FC<RouteComponentProps<DetailParams>> = ({
	match
}) => {
	const productStore = useContext(ProductStore);
	const {
		product,
		loadProduct,
		loadingInitial,
	} = productStore;

	useEffect(() => {
		loadProduct(match.params.id);
	}, [loadProduct, match.params.id]);

	if(loadingInitial || !product) return <LoadingComponent content='Loading product...' />

	return (
		<Grid>
			<Grid.Column width={10}>
				<ProductDetailedHeader product={product} />
				<ProductDetailedInfo product={product} />
			</Grid.Column>
			<Grid.Column width={6}>
				<ProductDetailedSidebar />
			</Grid.Column>
		</Grid>
	);
};

export default observer(ProductDetails);
