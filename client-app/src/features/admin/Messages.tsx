import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Icon, Table } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IContact } from '../../app/models/contact';
import { format } from 'date-fns';

const Messages = () => {
	const rootStore = useContext(RootStoreContext);
	const { loadContacts, loadingInitial, contactsByDate, deleteContact } =
		rootStore.contactStore!;

	useEffect(() => {
		loadContacts();
	}, [loadContacts]);

	return (
		<Tab.Pane loading={loadingInitial}>
			<Grid>
				<Grid.Column width={16}>
					<Header floated='left' icon='mail outline' content={'Mesazhet'} />
				</Grid.Column>
				<Grid.Column width={16}>
					<br />
					{contactsByDate.length > 0 ? (

					
					<Table celled padded size='small' style={{ marginTop: 0 }}>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Emri & Mbiemri</Table.HeaderCell>
								<Table.HeaderCell>Email</Table.HeaderCell>
								<Table.HeaderCell>Mesazhi</Table.HeaderCell>
								<Table.HeaderCell>Nr. Telefonit</Table.HeaderCell>
								<Table.HeaderCell>Qyteti</Table.HeaderCell>
								<Table.HeaderCell>Data</Table.HeaderCell>
								<Table.HeaderCell>Opsionet</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{contactsByDate.map((contact: IContact) => (
								<Table.Row key={contact.id}>
									<Table.Cell>{contact.fullName}</Table.Cell>
									<Table.Cell>{contact.email}</Table.Cell>
									<Table.Cell>{contact.message}</Table.Cell>
									<Table.Cell>{contact.phoneNumber}</Table.Cell>
									<Table.Cell>{contact.city}</Table.Cell>
									<Table.Cell>
										{format(contact.date, 'eeee do MMMM')} at{' '}
										{format(contact.date, 'h:mm a')}
									</Table.Cell>

									<Table.Cell textAlign='center'>
										<Icon
											onClick={() => {
												if (window.confirm('A je i sigurt ?'))
													deleteContact(contact.id);
											}}
											name='trash alternate outline'
											style={{ cursor: 'pointer' }}
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
							content={'Nuk ka asnj?? mesazh p??r t?? shfaqur'}
						></Header>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(Messages);
