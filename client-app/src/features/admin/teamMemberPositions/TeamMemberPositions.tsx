import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Table, Button } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { ITeamMemberPosition } from '../../../app/models/teamMemberPosition';
import { Fragment } from 'react';
import TeamMemberPositionForm from './TeamMemberPositionForm';

const TeamMemberPositions = () => {
	const rootStore = useContext(RootStoreContext);
	const {
		teamMemberPositionsArr,
		loadTeamMemberPositions,
		selectedTeamMemberPosition,
		openEditForm,
		openCreateForm,
		editMode,
		loadingInitial,
		deleteTeamMemberPosition,
		cancelFormOpen,
	} = rootStore.teamMemberPositionStore;

	useEffect(() => {
		loadTeamMemberPositions();
	}, [loadTeamMemberPositions]);

	return (
		<Tab.Pane loading={loadingInitial}>
			<Grid>
				<Grid.Column width={16}>
					<Header floated='left' content={'Pozitat e antarëve të ekipit'} />
				</Grid.Column>
				<Grid.Column width={10}>
					<br />
					<Table celled padded size='small' style={{ marginTop: 0 }}>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Pozita</Table.HeaderCell>
								<Table.HeaderCell width={8}>Opsionet</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{teamMemberPositionsArr.map(
								(teamMemberPosition: ITeamMemberPosition) => (
									<Table.Row key={teamMemberPosition.id}>
										<Table.Cell>{teamMemberPosition.position}</Table.Cell>
										<Table.Cell>
											<Button
												style={{ marginRight: '10px' }}
												name={teamMemberPosition.id}
												size='tiny'
												color='facebook'
												type='submit'
												content='Edit'
												onClick={() => openEditForm(teamMemberPosition!.id)}
											/>
											<Button
												onClick={() => {
													if (window.confirm('A je i sigurt ?'))
														deleteTeamMemberPosition(teamMemberPosition.id);
												}}
												size='tiny'
												negative
												type='submit'
												content='Delete'
											/>
										</Table.Cell>
									</Table.Row>
								)
							)}
						</Table.Body>
					</Table>
				</Grid.Column>
				<Grid.Column width={6} style={{ paddingTop: '34px' }}>
					{!editMode ? (
						<Button
							positive
							content='Shto Pozitë'
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
							<TeamMemberPositionForm
								key={
									(selectedTeamMemberPosition &&
										selectedTeamMemberPosition.id) ||
									0
								}
								teamMemberPosition={selectedTeamMemberPosition!}
							/>
						</Fragment>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(TeamMemberPositions);
