import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Table, Button } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IBlogCategory } from '../../../app/models/blogCategory';
import { Fragment } from 'react';
import BlogCategoryForm from './BlogCategoryForm';

const BlogCategories = () => {
	const rootStore = useContext(RootStoreContext);
	const {
		blogCategoriesArr,
		loadBlogCategories,
		selectedBlogCategory,
		openEditForm,
		openCreateForm,
		editMode,
		loadingInitial,
		deleteBlogCategory,
		submitting,
		target,
		cancelFormOpen,
	} = rootStore.blogCategoryStore;

	useEffect(() => {
		loadBlogCategories();
	}, [loadBlogCategories]);

	return (
		<Tab.Pane loading={loadingInitial}>
			<Grid>
				<Grid.Column width={16}>
					<Header floated='left' content={'Kategoritë e blogjev'} />
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
							{blogCategoriesArr.map((blogCategory: IBlogCategory) => (
								<Table.Row key={blogCategory.id}>
									<Table.Cell>{blogCategory.category}</Table.Cell>

									<Table.Cell>
										<Button
											style={{ marginRight: '10px' }}
											name={blogCategory.id}
											size='small'
											color='facebook'
											type='submit'
											content='Edit'
											onClick={() => openEditForm(blogCategory!.id)}
										/>
										<Button
											onClick={() => {
												if (window.confirm('A je i sigurt ?'))
													deleteBlogCategory(blogCategory.id);
											}}
											loading={target === blogCategory.id && submitting}
											name={blogCategory.id}
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
							<BlogCategoryForm
								key={(selectedBlogCategory && selectedBlogCategory.id) || 0}
								blogCategory={selectedBlogCategory!}
							/>
						</Fragment>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(BlogCategories);
