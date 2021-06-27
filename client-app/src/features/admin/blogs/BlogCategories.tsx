import React, { useEffect, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Table, Confirm, Button } from 'semantic-ui-react';
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

	const [confirm, setConfirm] = useState(false);

	const handleDelete = (e: any, blogCategoryId: string) => {
		deleteBlogCategory(e, blogCategoryId);
		setConfirm(false);
	};

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
											onClick={() => setConfirm(true)}
											loading={target === blogCategory.id && submitting}
											name={blogCategory.id}
											size='small'
											negative
											type='submit'
											content='Delete'
										/>

										<Confirm
											open={confirm}
											onCancel={() => setConfirm(false)}
											onConfirm={(e) => handleDelete(e, blogCategory.id)}
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
