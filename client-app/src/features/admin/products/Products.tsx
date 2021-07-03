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
import { IProduct } from '../../../app/models/product';
import { format } from 'date-fns';

const Products = () => {
	const rootStore = useContext(RootStoreContext);
	const {
		loadProducts,
		loadingInitial,
		productsByDate,
		deleteProductFromAdmin,
	} = rootStore.productStore!;
	const { user } = rootStore.userStore;

	useEffect(() => {
		loadProducts();
	}, [loadProducts]);

	return (
		<Tab.Pane loading={loadingInitial}>
			<Grid>
				<Grid.Column width={16}>
					<Header floated='left' icon='calendar' content={'Produktet'} />
				</Grid.Column>
				<Grid.Column width={16}>
					<br />
					{productsByDate.length > 0 ? (
					<Table celled padded size='large' style={{ marginTop: 0 }}>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Titulli</Table.HeaderCell>
								<Table.HeaderCell>Përshkrimi</Table.HeaderCell>
								<Table.HeaderCell>Kategoria</Table.HeaderCell>
								<Table.HeaderCell>Çmimi</Table.HeaderCell>
								<Table.HeaderCell>Qyteti</Table.HeaderCell>
								<Table.HeaderCell>Postuar me</Table.HeaderCell>
								<Table.HeaderCell>Postuar nga</Table.HeaderCell>
								<Table.HeaderCell>Opsionet</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{productsByDate
								.filter((a) => a.username !== user!.username)
								.map((product: IProduct) => (
									<Table.Row key={product.id}>
									<Table.Cell><Link to={`/products/${product.id}`}>{product.title}</Link></Table.Cell>
										<Table.Cell>{product.description.slice(0, 50) + (product.description.length > 50 ? "..." : "")}</Table.Cell>
										<Table.Cell>{product.category}</Table.Cell>
										<Table.Cell>{product.price} €</Table.Cell>
										<Table.Cell>{product.city}</Table.Cell>
										<Table.Cell>
											{format(product.date, 'eeee do MMMM')} at{' '}
											{format(product.date, 'h:mm a')}
										</Table.Cell>
										<Table.Cell>{product.attendees[0].displayName}</Table.Cell>

										<Table.Cell>
											<Link
												style={{
													marginRight: '10px',
												}}
												to={`/manage/${product.id}`}
											>
												<Icon
													name='edit outline'
													style={{ cursor: 'pointer' }}
												/>
											</Link>
											<Icon
												onClick={() => {
													if (window.confirm('A je i sigurt ?'))
														deleteProductFromAdmin(product.id);
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
								content={'Nuk ka asnjë produkt për të shfaqur'}
							></Header>
						)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(Products);
