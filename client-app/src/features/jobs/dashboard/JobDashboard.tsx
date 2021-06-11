import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import JobList from './JobList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

const JobDashboard: React.FC = () => {
	const rootStore = useContext(RootStoreContext);
	const  {loadJobs, loadingInitial} = rootStore.jobStore;

	useEffect(() => {
		loadJobs();
	}, [loadJobs]);

	if (loadingInitial)
		return <LoadingComponent content='Loading jobs' />;
		
	return (
		<Grid>
			<Grid.Column width={14}>
				<JobList />
			</Grid.Column>
			<Grid.Column width={2}>
				
			</Grid.Column>
		</Grid>
	);
};

export default observer(JobDashboard);