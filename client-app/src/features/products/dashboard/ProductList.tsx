import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Item } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ProductListItem from './ProductListItem';

const ProductList: React.FC = () => {
	const rootStore = useContext(RootStoreContext);
	const { productsByDate } = rootStore.productStore;

	return (
			<Item.Group divided style={{marginTop: '15px', marginBottom: '15px'}}>
				{productsByDate.map((product) => (
					<ProductListItem key={product.id} product={product} />
				))}
			</Item.Group>	
	);
};

export default observer(ProductList);
