import React, { Fragment } from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { IJob } from '../../../app/models/job';
import { observer } from 'mobx-react-lite';

const JobDetailedSidebar: React.FC<{ job: IJob }> = ({ job }) => {
	const { formatDistance } = require('date-fns');
	const expireDay = job.expiresAt;
	const presentDay = new Date();
	let expireDays = formatDistance(presentDay, expireDay);

	return (
		<Fragment>
			<Table definition>
				<Table.Body>
					<Table.Row>
						<Table.Cell textAlign='center'>
							<Icon name='th' />
							<span>Kategoria</span>
						</Table.Cell>
						<Table.Cell textAlign='center'>{job.category}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell textAlign='center'>
							<Icon name='calendar alternate outline' style={{}} />
							<span>Skadon</span>
						</Table.Cell>
						<Table.Cell textAlign='center'>{`${expireDays.replace(
							'days',
							'ditë'
						)}`}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell textAlign='center'>
							<Icon name='clock outline' style={{}} />
							<span> Orari</span>
						</Table.Cell>
						<Table.Cell textAlign='center'>{job.workingHours}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell textAlign='center'>
							<Icon name='map marker alternate' /> <span>Lokacioni</span>
						</Table.Cell>
						<Table.Cell textAlign='center'>{job.city}</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		</Fragment>
	);
};

export default observer(JobDetailedSidebar);
