import React, { useEffect, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
	Tab,
	Grid,
	Header,
	Image,
	Icon,
	Table,
	Confirm,
} from 'semantic-ui-react';
import { IProfile } from '../../app/models/profile';
import { RootStoreContext } from '../../app/stores/rootStore';
import { Link } from 'react-router-dom';

const Users = () => {
	const rootStore = useContext(RootStoreContext);
	const { loadUsers, loadingUsers, users, deleteUser } =
		rootStore.profileStore!;
	const { user } = rootStore.userStore;

	const [confirm, setConfirm] = useState(false);

	const handleDelete = (username: string) => {
		deleteUser(username);
		setConfirm(false);
	};

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
										<Table.Cell><Link to={`/profile/${user.username}`}>{user.displayName}</Link></Table.Cell>
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
												onClick={() => setConfirm(true)}
												name='trash alternate outline'
												style={{ cursor: 'pointer' }}
											/>

											<Confirm
												open={confirm}
												onCancel={() => setConfirm(false)}
												onConfirm={() => {
													handleDelete(user.username);
												}}
												content='A je i sigurt ?'
											/>
										</Table.Cell>
									</Table.Row>
								))}
						</Table.Body>
					</Table>
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(Users);
