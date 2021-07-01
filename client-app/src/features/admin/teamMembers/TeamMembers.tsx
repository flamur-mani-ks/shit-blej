import React, { useEffect, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Table, Confirm, Button } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { ITeamMember } from '../../../app/models/teamMember';
import { Fragment } from 'react';
import TeamMemberForm from './TeamMemberForm';

const TeamMembers = () => {
	const rootStore = useContext(RootStoreContext);
	const {
		teamMembersArr,
		loadTeamMembers,
		selectedTeamMember,
		openEditForm,
		openCreateForm,
		editMode,
		loadingInitial,
		deleteTeamMember,
		submitting,
		target,
		cancelFormOpen,
	} = rootStore.teamMemberStore;

	const [confirm, setConfirm] = useState(false);

	const handleDelete = (e: any, teamMemberId: string) => {
		deleteTeamMember(e, teamMemberId);
		setConfirm(false);
	};

	useEffect(() => {
		loadTeamMembers();
	}, [loadTeamMembers]);

	return (
		<Tab.Pane loading={loadingInitial}>
			<Grid>
				<Grid.Column width={16}>
					<Header floated='left' content={'Antarët e ekipit'} />
				</Grid.Column>
				<Grid.Column width={10}>
					<br />
					<Table celled padded size='small' style={{ marginTop: 0 }}>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Emri & Mbiemri</Table.HeaderCell>
								<Table.HeaderCell>Pozita</Table.HeaderCell>
								<Table.HeaderCell width={8}>Bio</Table.HeaderCell>
								<Table.HeaderCell width={8}>Opsionet</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{teamMembersArr.map((teamMember: ITeamMember) => (
								<Table.Row key={teamMember.id}>
									<Table.Cell>{teamMember.fullName}</Table.Cell>
									<Table.Cell>{teamMember.position}</Table.Cell>
									<Table.Cell>{teamMember.bio}</Table.Cell>

									<Table.Cell>
										<Button
											style={{ marginRight: '10px' }}
											name={teamMember.id}
											size='tiny'
											color='facebook'
											type='submit'
											content='Edit'
											onClick={() => openEditForm(teamMember!.id)}
										/>
										<Button
											onClick={() => setConfirm(true)}
											loading={target === teamMember.id && submitting}
											name={teamMember.id}
											size='tiny'
											negative
											type='submit'
											content='Delete'
										/>

										<Confirm
											open={confirm}
											onCancel={() => setConfirm(false)}
											onConfirm={(e) => handleDelete(e, teamMember.id)}
											content='A je i sigurt ?'
										/>
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				</Grid.Column>
				<Grid.Column width={6} style={{ paddingTop: '34px' }}>
					{!editMode ? (
						<Button
							positive
							content='Shto Antarë'
							onClick={openCreateForm}
							size='small'
						/>
					) : (
						<Fragment>
							<Button
								negative
								content='Cancel'
								onClick={cancelFormOpen}
								size='small'
							/>
							<TeamMemberForm
								key={(selectedTeamMember && selectedTeamMember.id) || 0}
								teamMember={selectedTeamMember!}
							/>
						</Fragment>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(TeamMembers);
