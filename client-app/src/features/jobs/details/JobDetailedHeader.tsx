import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Grid, Divider, Image } from 'semantic-ui-react';
import { IJob } from '../../../app/models/job';

const JobDetailedHeader: React.FC<{ job: IJob }> = ({ job }) => {
	const owner = job.attendees[0];

	return (
		<Segment>
			<Grid columns={2} relaxed='very'>
				<Grid.Column>
					<Image
						src={owner.image || '/assets/user.png'}
						size='small'
						centered
						rounded
					/>
				</Grid.Column>
				<Grid.Column
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<div>
						<h4>
							<Link to={`/profile/${owner.username}`}>{owner.displayName}</Link>
						</h4>
					</div>
					<div>
						<h1>{job.title}</h1>
					</div>
				</Grid.Column>
			</Grid>

			<Divider vertical></Divider>
		</Segment>
	);
};

export default observer(JobDetailedHeader);
