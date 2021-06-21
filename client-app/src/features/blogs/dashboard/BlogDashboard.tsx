import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import BlogList from './BlogList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

const BlogDashboard: React.FC = () => {
	const rootStore = useContext(RootStoreContext);
	const  {loadBlogs, loadingInitial} = rootStore.blogStore;

	useEffect(() => {
		loadBlogs();
	}, [loadBlogs]);

	if (loadingInitial)
		return <LoadingComponent content='Loading blogs' />;
		
	return (
		<Grid>
			<Grid.Column width={14}>
				<BlogList />
			</Grid.Column>
			<Grid.Column width={2}>
				
			</Grid.Column>
		</Grid>
	);
};

export default observer(BlogDashboard);