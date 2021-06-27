import React, { useEffect, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
	Tab,
	Grid,
	Header,
	Icon,
	Table,
	Confirm,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IJob } from '../../../app/models/job';
import { format } from 'date-fns';

const Jobs = () => {
	const rootStore = useContext(RootStoreContext);
	const { loadJobs, loadingInitial, jobsByDate, deleteJobFromAdmin } =
		rootStore.jobStore!;
	const { user } = rootStore.userStore;

	const { formatDistance } = require('date-fns');
	const presentDay = new Date();

	const handleDelete = (id: string) => {
		deleteJobFromAdmin(id);
		setConfirm(false);
	};

	const [confirm, setConfirm] = useState(false);

	useEffect(() => {
		loadJobs();
	}, [loadJobs]);

	return (
		<Tab.Pane loading={loadingInitial}>
			<Grid>
				<Grid.Column width={16}>
					<Header
						floated='left'
						icon='announcement'
						content={'Shpalljet e punës'}
					/>
				</Grid.Column>
				<Grid.Column width={16}>
					<br />
					{jobsByDate.length > 0 ? (
					<Table celled padded size='small' style={{ marginTop: 0 }}>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Titulli</Table.HeaderCell>
								<Table.HeaderCell>Përshkrimi</Table.HeaderCell>
								<Table.HeaderCell>Kategoria</Table.HeaderCell>
								<Table.HeaderCell>Orari</Table.HeaderCell>
								<Table.HeaderCell>Qyteti</Table.HeaderCell>
								<Table.HeaderCell>Skadon</Table.HeaderCell>
								<Table.HeaderCell>Postuar me</Table.HeaderCell>
								<Table.HeaderCell>Postuar nga</Table.HeaderCell>
								<Table.HeaderCell>Opsionet</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{jobsByDate
								.filter((a) => a.username !== user!.username)
								.map((job: IJob) => (
									<Table.Row key={job.id}>
										<Table.Cell><Link to={`/jobs/${job.id}`}>{job.title}</Link></Table.Cell>
										<Table.Cell>{job.description.slice(0, 40) + (job.description.length > 40 ? "..." : "")}</Table.Cell>
										<Table.Cell>{job.category}</Table.Cell>
										<Table.Cell>{job.workingHours}</Table.Cell>
										<Table.Cell>{job.city}</Table.Cell>
										<Table.Cell>{`${formatDistance(
											presentDay,
											job.expiresAt
										).replace('days', 'ditë')}`}</Table.Cell>
										<Table.Cell>
											{format(job.createdAt, 'eeee do MMMM')} at{' '}
											{format(job.createdAt, 'h:mm a')}
										</Table.Cell>
										<Table.Cell>{job.attendees[0].displayName}</Table.Cell>

										<Table.Cell>
											<Link
												style={{
													marginRight: '10px',
												}}
												to={`/manageJob/${job.id}`}
											>
												<Icon
													name='edit outline'
													style={{ cursor: 'pointer' }}
												/>
											</Link>
											<Icon
												onClick={() => setConfirm(true)}
												name='trash alternate outline'
												style={{ cursor: 'pointer' }}
											/>

											<Confirm
												open={confirm}
												onCancel={() => setConfirm(false)}
												onConfirm={() => {
													handleDelete(job.id);
												}}
												content='A je i sigurt ?'
											/>
										</Table.Cell>
									</Table.Row>
								))}
						</Table.Body>
					</Table>
						): (
							<Header
								as='h2'
								textAlign='center'
								content={'Nuk ka asnjë shpallje pune për të shfaqur'}
							></Header>
						)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(Jobs);
