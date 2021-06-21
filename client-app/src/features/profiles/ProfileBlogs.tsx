import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IUserBlog } from '../../app/models/profile';
import { RootStoreContext } from '../../app/stores/rootStore';
import { format } from 'date-fns';

const ProfileEvents = () => {
	const rootStore = useContext(RootStoreContext);
	const { loadUserBlogs, profile, loadingBlogs, userBlogs } =
		rootStore.profileStore!;

	useEffect(() => {
		loadUserBlogs(profile!.username);
	}, [loadUserBlogs, profile]);

	return (
		<Tab.Pane loading={loadingBlogs}>
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
					{userBlogs.length > 0 ? (
						<Card.Group itemsPerRow={4}>
							{userBlogs.map((blog: IUserBlog) => (
								<Card as={Link} to={`/blogs/${blog.id}`} key={blog.id}>
									<Image
										src={`/assets/placeholder.png`}
										style={{ minHeight: 100, objectFit: 'cover' }}
									/>
									<Label
										style={{ position: 'absolute', left: '203px' }}
										color='teal'
										ribbon='right'
									>
										{blog.category}
									</Label>
									<Card.Content>
										<Card.Header textAlign='center'>{blog.title}</Card.Header>
										<Card.Meta textAlign='center'>
											<div>
												<Icon name='clock' />{' '}
												{format(blog.date, 'eeee do MMMM')} at{' '}
												{format(blog.date, 'h:mm a')}
											</div>
										</Card.Meta>
									</Card.Content>
								</Card>
							))}
						</Card.Group>
					):(
						<Header as='h2' textAlign='center' content={'Nuk ka asnjë blog për të shfaqur'}></Header>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(ProfileEvents);
