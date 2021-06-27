import React, { useEffect, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Icon, Table, Confirm } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IBlog } from '../../../app/models/blog';
import { format } from 'date-fns';

const Blogs = () => {
	const rootStore = useContext(RootStoreContext);
	const { loadBlogs, loadingInitial, blogsByDate, deleteBlogFromAdmin } =
		rootStore.blogStore!;
	const { user } = rootStore.userStore;

	const handleDelete = (id: string) => {
		deleteBlogFromAdmin(id);
		setConfirm(false);
	};

	const [confirm, setConfirm] = useState(false);

	useEffect(() => {
		loadBlogs();
	}, [loadBlogs]);

	return (
		<Tab.Pane loading={loadingInitial}>
			<Grid>
				<Grid.Column width={16}>
					<Header
						floated='left'
            icon='window maximize outline'
						content={'Blog postimet'}
					/>
				</Grid.Column>
				<Grid.Column width={16}>
					<br />
					{blogsByDate.length > 0 ? (
					<Table celled padded size='small' style={{ marginTop: 0 }}>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Titulli</Table.HeaderCell>
								<Table.HeaderCell>Përmbajtja</Table.HeaderCell>
								<Table.HeaderCell>Kategoria</Table.HeaderCell>
								<Table.HeaderCell>Postuar me</Table.HeaderCell>
								<Table.HeaderCell>Postuar nga</Table.HeaderCell>
								<Table.HeaderCell>Opsionet</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{blogsByDate
								.filter((a) => a.username !== user!.username)
								.map((blog: IBlog) => (
									<Table.Row key={blog.id}>
										<Table.Cell>
											<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
										</Table.Cell>
										<Table.Cell>
											{blog.body.slice(0, 80) +
												(blog.body.length > 80 ? '...' : '')}
										</Table.Cell>
										<Table.Cell>{blog.category}</Table.Cell>
										<Table.Cell>
											{format(blog.date, 'eeee do MMMM')} at{' '}
											{format(blog.date, 'h:mm a')}
										</Table.Cell>
										<Table.Cell>{blog.attendees[0].displayName}</Table.Cell>

										<Table.Cell>
											<Link
												style={{
													marginRight: '10px',
												}}
												to={`/manageBlog/${blog.id}`}
											>
												<Icon
													name='edit outline'
													style={{ cursor: 'pointer' }}
												/>
											</Link>
											<Icon
												onClick={() => setConfirm(true)}
												name='trash alternate outline'
												style={{ cursor: 'pointer' }}
											/>

											<Confirm
												open={confirm}
												onCancel={() => setConfirm(false)}
												onConfirm={() => {
													handleDelete(blog.id);
												}}
												content='A je i sigurt ?'
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
								content={'Nuk ka asnjë blog post për të shfaqur'}
							></Header>
						)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(Blogs);
