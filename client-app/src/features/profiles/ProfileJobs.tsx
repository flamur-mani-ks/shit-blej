import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IUserJob } from '../../app/models/profile';
import { RootStoreContext } from '../../app/stores/rootStore';

const ProfileEvents = () => {
	const rootStore = useContext(RootStoreContext);
	const { loadUserJobs, profile, loadingJobs, userJobs } =
		rootStore.profileStore!;

	useEffect(() => {
		loadUserJobs(profile!.username);
	}, [loadUserJobs, profile]);

	const { formatDistance } = require('date-fns');
	const presentDay = new Date();

	return (
		<Tab.Pane loading={loadingJobs}>
			<Grid>
				<Grid.Column width={16}>
					<Header floated='left' icon='announcement' content={'Shpalljet e punës'} />
				</Grid.Column>
				<Grid.Column width={16}>
					<br />
					<Card.Group itemsPerRow={4}>
						{userJobs.map((job: IUserJob) => (
							<Card as={Link} to={`/jobs/${job.id}`} key={job.id}>
								<Image
									src={`/assets/placeholder.png`}
									style={{ minHeight: 100, objectFit: 'cover' }}
								/>
								<Label
									style={{ position: 'absolute', left: '203px' }}
									color='teal'
									ribbon='right'
								>
									{job.category}
								</Label>
								<Card.Content>
									<Card.Header textAlign='center'>{job.title}</Card.Header>
									<Card.Meta textAlign='center'>
										<div>
											<Icon name='clock' />{' '}
											{`Skadon: ${formatDistance(
												presentDay,
												job.expiresAt
											).replace('days', 'ditë')}`}
										</div>
									</Card.Meta>
								</Card.Content>
							</Card>
						))}
					</Card.Group>
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(ProfileEvents);
