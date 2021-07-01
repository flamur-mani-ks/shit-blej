import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { IJob } from '../../../app/models/job';
import { RootStoreContext } from '../../../app/stores/rootStore';

const JobDetailedInfo: React.FC<{ job: IJob }> = ({ job }) => {
  const owner = job.attendees.filter((x) => x.isOwner)[0];
  const rootStore = useContext(RootStoreContext);
  const {isLoggedIn, user} = rootStore.userStore;

	return (
		<Segment.Group>
				{isLoggedIn && owner.username === user!.username && (
			<Segment>
					<Button as={Link} to={`/manageJob/${job.id}`} color='orange'>
						Menagjo postimin
					</Button>
			</Segment>
				)}
			<Segment>
				<Header as='h3' content={job.description} />
			</Segment>
		</Segment.Group>
	);
};

export default observer(JobDetailedInfo);
