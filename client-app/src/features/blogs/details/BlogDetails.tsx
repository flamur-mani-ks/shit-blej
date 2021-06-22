import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import {
	Button,
	Grid,
	Header,
	Icon,
	Image,
	Label,
	Segment,
} from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import BlogDetailsChat from './BlogDetailsChat';

interface DetailParams {
	id: string;
}

const BlogDetails: React.FC<RouteComponentProps<DetailParams>> = ({
	match,
}) => {
	const rootStore = useContext(RootStoreContext);
	const { blog, loadBlog, loadingInitial } = rootStore.blogStore;
	const { isLoggedIn, user } = rootStore.userStore;

	useEffect(() => {
		loadBlog(match.params.id);
	}, [loadBlog, match.params.id]);

	if (loadingInitial) return <LoadingComponent content='Loading blog...' />;

	if (!blog) return <h2>Blog not found</h2>;

	const owner = blog!.attendees[0];

	return (
		<Fragment>
			<Segment raised>
				<Header
					style={{ padding: '10px 0px 10px 50px' }}
					as='h1'
					content={blog.title}
				></Header>
			</Segment>

			<Segment raised>
				<Grid>
					<Grid.Column
						style={{
							marginTop: '20px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
						width={6}
					>
						<div>
							<Image
								src={owner.image || '/assets/user.png'}
								circular
								size='small'
								centered
							/>

							<Header
								textAlign='center'
								as='h4'
								content={`Autor:    ${owner.displayName}`}
							></Header>
						</div>
					</Grid.Column>
					<Grid.Column style={{ marginTop: '20px' }} width={10}>
						<Image src={'/assets/placeholder.png'} rounded size='big' />
					</Grid.Column>
					<Grid.Column width={15}>
						<div style={{ paddingLeft: '50px' }}>
							{isLoggedIn && owner.username === user!.username && (
								<>
									<Button
										as={Link}
										to={`/manageBlog/${blog.id}`}
										color='orange'
									>
										Menagjo postimin
									</Button>
									<br />
									<br />
								</>
							)}
							<Label size='large' tag color='violet'>
								{blog.category}
							</Label>
							<Header
								style={{ lineHeight: '21px' }}
								as='h4'
								content={blog.body}
							></Header>
							<Icon name='clock' /> {format(blog.date, 'eeee do MMMM')} at{' '}
							{format(blog.date, 'h:mm a')}
							<BlogDetailsChat />
						</div>
					</Grid.Column>
				</Grid>
			</Segment>
		</Fragment>
	);
};

export default observer(BlogDetails);
