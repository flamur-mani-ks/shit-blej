import React, { useContext, useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import ProductList from './ProductList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import InfiniteScroll from 'react-infinite-scroller';


const ProductDashboard: React.FC = () => {

	const rootStore = useContext(RootStoreContext);
	const { loadProducts, loadingInitial, setPage, page, totalPages } =
		rootStore.productStore;
	const [loadingNext, setLoadingNext] = useState(false);

	const handleGetNext = () => {
		setLoadingNext(true);
		setPage(page + 1);
		loadProducts().then(() => setLoadingNext(false));
	};

	useEffect(() => {
		loadProducts();
	}, [loadProducts]);

	if (loadingInitial && page === 0)
		return <LoadingComponent content='Loading products' />;

	return (
		<Grid>
			<Grid.Column width={10}>
				<InfiniteScroll
					pageStart={0}
					loadMore={handleGetNext}
					hasMore={!loadingNext && page + 1 < totalPages}
					initialLoad={false}
				>
					<ProductList />
				</InfiniteScroll>
			</Grid.Column>
			<Grid.Column width={6}>
			</Grid.Column>
			<Grid.Column width={10}>
				<Loader active={loadingNext} />
			</Grid.Column>
		</Grid>
	);
};

export default observer(ProductDashboard);
