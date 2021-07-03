import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Table, Button } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IJobCategory } from '../../../app/models/jobCategory';
import { Fragment } from 'react';
import JobCategoryForm from './JobCategoryForm';

const JobCategories = () => {
	const rootStore = useContext(RootStoreContext);
	const {
		jobCategoriesArr,
		loadJobCategories,
		selectedJobCategory,
		openEditForm,
		openCreateForm,
		editMode,
		loadingInitial,
		deleteJobCategory,
		submitting,
		target,
		cancelFormOpen,
	} = rootStore.jobCategoryStore;

	useEffect(() => {
		loadJobCategories();
	}, [loadJobCategories]);

	return (
		<Tab.Pane loading={loadingInitial}>
			<Grid>
				<Grid.Column width={16}>
					<Header floated='left' content={'Kategoritë e shpalljev'} />
				</Grid.Column>
				<Grid.Column width={8}>
					<br />
					<Table celled padded size='small' style={{ marginTop: 0 }}>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Kategoria</Table.HeaderCell>
								<Table.HeaderCell width={8}>Opsionet</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{jobCategoriesArr.map((jobCategory: IJobCategory) => (
								<Table.Row key={jobCategory.id}>
									<Table.Cell>{jobCategory.category}</Table.Cell>

									<Table.Cell>
										<Button
											style={{ marginRight: '10px' }}
											name={jobCategory.id}
											size='small'
											color='facebook'
											type='submit'
											content='Edit'
											onClick={() => openEditForm(jobCategory!.id)}
										/>
										<Button
											onClick={() => {
												if (window.confirm('A je i sigurt ?'))
													deleteJobCategory(jobCategory!.id);
											}}
											loading={target === jobCategory.id && submitting}
											name={jobCategory.id}
											size='small'
											negative
											type='submit'
											content='Delete'
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
							content='Shto Kategori'
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
							<JobCategoryForm
								key={(selectedJobCategory && selectedJobCategory.id) || 0}
								jobCategory={selectedJobCategory!}
							/>
						</Fragment>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(JobCategories);
