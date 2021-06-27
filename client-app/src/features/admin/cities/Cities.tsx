import React, { useEffect, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
	Tab,
	Grid,
	Header,
	Table,
	Confirm,
	Button,
} from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { ICity } from '../../../app/models/city';
import { Fragment } from 'react';
import CityForm from './CityForm';

const Cities = () => {
	const rootStore = useContext(RootStoreContext);
	const {
		citiesByDate,
		loadCities,
		selectedCity,
		openEditForm,
		openCreateForm,
		editMode,
		loadingInitial,
		deleteCity,
		submitting,
		target,
		cancelFormOpen,
	} = rootStore.cityStore;

	const [confirm, setConfirm] = useState(false);

	const handleDelete = (e: any, cityId: string,) => {
		deleteCity(e,cityId);
		setConfirm(false);
	};

	useEffect(() => {
		loadCities();
	}, [loadCities]);

	return (
		<Tab.Pane loading={loadingInitial}>
			<Grid>
				<Grid.Column width={16}>
					<Header floated='left' content={'Qytetet'} />
				</Grid.Column>
				<Grid.Column width={8}>
					<br />
					<Table celled padded size='small' style={{ marginTop: 0 }}>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Qyeti</Table.HeaderCell>
								<Table.HeaderCell width={8}>Opsionet</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{citiesByDate.map((city: ICity) => (
								<Table.Row key={city.id}>
									<Table.Cell>{city.cityName}</Table.Cell>

									<Table.Cell>
										<Button
											style={{ marginRight: '10px' }}
											name={city.id}
											size='small'
											color='facebook'
											type='submit'
											content='Edit'
											onClick={() => openEditForm(city!.id)}
										/>
										<Button
											onClick={() => setConfirm(true)}
											loading={target === city.id && submitting}
											name={city.id}
											size='small'
											negative
											type='submit'
											content='Delete'
										/>

										<Confirm
											open={confirm}
											onCancel={() => setConfirm(false)}
											onConfirm={(e) => handleDelete(e, city.id)}
											content='A je i sigurt ?'
										/>
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				</Grid.Column>
				<Grid.Column width={8} style={{ paddingTop: '34px' }}>
					{!editMode ? (
						<Button
							positive
							content='Shto Qytet'
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
							<CityForm
								key={(selectedCity && selectedCity.id) || 0}
								city={selectedCity!}
							/>
						</Fragment>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(Cities);
