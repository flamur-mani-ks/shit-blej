import React from 'react';
import { Card, Icon, Image, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IJob } from '../../../app/models/job';
import { observer } from 'mobx-react-lite';

const JobCardItem: React.FC<{ job: IJob }> = ({ job }) => {
	const { formatDistance } = require('date-fns');
	const expireDay = job.expiresAt;
	const presentDay = new Date();
  let expireDays = formatDistance(presentDay, expireDay);

  const owner = job.attendees[0];

	return (
		<Card>
			<Image as={Link} to={`/jobs/${job.id}`} src='/assets/placeholder.png' wrapped ui={false} />
      <Label style={{ position: 'absolute', left: '246px' }} color='teal' ribbon='right'>
					{job.category}
				</Label>
			<Card.Content style={{padding: '20px'}}>
				<Card.Header style={{marginBottom: '5px'}} as={Link} to={`/jobs/${job.id}`}>{job.title}</Card.Header>
				
				<Card.Description style={{marginBottom: '5px'}}>{job.city}</Card.Description>
        <Card.Meta>Postuar nga: <Link to={`/profile/${owner!.username!}`}>{owner!.displayName!}</Link></Card.Meta>
			</Card.Content>
			<div style={{paddingBottom: '5px', textAlign: 'center'}}>
				<Icon name='clock' />{' '}
				{`Skadon: ${expireDays.replace('days', 'ditë')}`}
			</div>
		</Card>
	);
};

export default observer(JobCardItem);
