import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import {
	Tab,
	Grid,
	Header,
	Image,
	Icon,
	Table,
} from 'semantic-ui-react';
import { IProfile } from '../../app/models/profile';
import { RootStoreContext } from '../../app/stores/rootStore';
import { Link } from 'react-router-dom';

const Users = () => {
	const rootStore = useContext(RootStoreContext);
	const { loadUsers, loadingUsers, users, deleteUser } =
		rootStore.profileStore!;
	const { user } = rootStore.userStore;

	useEffect(() => {
		loadUsers();
	}, [loadUsers]);

	return (
		<Tab.Pane loading={loadingUsers}>
			<Grid>
				<Grid.Column width={16}>
					<Header floated='left' icon='users' content={'Përdoruesit'} />
				</Grid.Column>
				<Grid.Column width={16}>
					<br />
					{users.filter((a) => a.username !== user!.username).length > 0 ? (
						<Table singleLine size='large' style={{ marginTop: 0 }}>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>Username</Table.HeaderCell>
									<Table.HeaderCell>Display Name</Table.HeaderCell>
									<Table.HeaderCell>Numri i telefonit</Table.HeaderCell>
									<Table.HeaderCell>Qyteti</Table.HeaderCell>
									<Table.HeaderCell>Foto</Table.HeaderCell>
									<Table.HeaderCell>Opsionet</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{users
									.filter((a) => a.username !== user!.username)
									.map((user: IProfile) => (
										<Table.Row key={user.username}>
											<Table.Cell>{user.username}</Table.Cell>
											<Table.Cell>
												<Link to={`/profile/${user.username}`}>
													{user.displayName}
												</Link>
											</Table.Cell>
											<Table.Cell>{user.phoneNumber}</Table.Cell>
											<Table.Cell>{user.city}</Table.Cell>
											<Table.Cell>
												<Image
													src={user.image || '/assets/user.png'}
													circular
													size='mini'
												/>
											</Table.Cell>
											<Table.Cell>
												<Icon
												onClick={() => {
													if (window.confirm('A je i sigurt ?'))
														deleteUser(user.username);
												}}
													name='trash alternate outline'
													style={{ cursor: 'pointer' }}
												/>
											</Table.Cell>
										</Table.Row>
									))}
							</Table.Body>
						</Table>
					) : (
						<Header
							as='h2'
							textAlign='center'
							content={'Nuk ka asnjë përdorues për të shfaqur'}
						></Header>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(Users);
