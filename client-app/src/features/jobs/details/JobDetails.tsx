import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import JobDetailedHeader from './JobDetailedHeader';
import JobDetailedInfo from './JobDetailedInfo';
import JobDetailedSidebar from './JobDetailedSidebar';

interface DetailParams {
	id: string;
}

const JobDetails: React.FC<RouteComponentProps<DetailParams>> = ({
	match
}) => {
	const rootStore = useContext(RootStoreContext);
	const {
		job,
		loadJob,
		loadingInitial,
	} = rootStore.jobStore;

	useEffect(() => {
		loadJob(match.params.id);
	}, [loadJob, match.params.id]);

	if(loadingInitial) return <LoadingComponent content='Loading job...' />

	if(!job)
		return <h2>Job not found</h2>

	return (
		<Grid>
			<Grid.Column width={10}>
				<JobDetailedHeader job={job} />
				<JobDetailedInfo job={job} />
			</Grid.Column>
			<Grid.Column width={6}>
				<JobDetailedSidebar job={job}  />
			</Grid.Column>
		</Grid>
	);
};

export default observer(JobDetails);
