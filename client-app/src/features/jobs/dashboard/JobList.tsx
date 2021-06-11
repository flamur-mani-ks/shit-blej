import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import JobCardItem from './JobCardItem';

const JobList: React.FC = () => {
	const rootStore = useContext(RootStoreContext);
	const { jobsByDate } = rootStore.jobStore;

	return (
		<Card.Group itemsPerRow={4}>
        {jobsByDate.map((job) => (
          <JobCardItem key={job.id} job={job} />
        ))}
      </Card.Group>
	);
};

export default observer(JobList);