import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Table, Button } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IProductCategory } from '../../../app/models/productCategory';
import { Fragment } from 'react';
import ProductCategoryForm from './ProductCategoryForm';

const ProductCategories = () => {
	const rootStore = useContext(RootStoreContext);
	const {
		productCategoriesArr,
		loadProductCategories,
		selectedProductCategory,
		openEditForm,
		openCreateForm,
		editMode,
		loadingInitial,
		deleteProductCategory,
		submitting,
		target,
		cancelFormOpen,
	} = rootStore.productCategoryStore;

	useEffect(() => {
		loadProductCategories();
	}, [loadProductCategories]);

	return (
		<Tab.Pane loading={loadingInitial}>
			<Grid>
				<Grid.Column width={16}>
					<Header floated='left' content={'KategoritÃ« e produktev'} />
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
							{productCategoriesArr.map((productCategory: IProductCategory) => (
								<Table.Row key={productCategory.id}>
									<Table.Cell>{productCategory.category}</Table.Cell>

									<Table.Cell>
										<Button
											style={{ marginRight: '10px' }}
											name={productCategory.id}
											size='small'
											color='facebook'
											type='submit'
											content='Edit'
											onClick={() => openEditForm(productCategory!.id)}
										/>
										<Button
											onClick={() => {
												if (window.confirm('A je i sigurt ?'))
													deleteProductCategory(productCategory.id);
											}}
											loading={target === productCategory.id && submitting}
											name={productCategory.id}
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
							<ProductCategoryForm
								key={
									(selectedProductCategory && selectedProductCategory.id) || 0
								}
								productCategory={selectedProductCategory!}
							/>
						</Fragment>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(ProductCategories);
