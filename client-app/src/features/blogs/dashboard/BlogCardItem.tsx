import React from 'react';
import { Card, Icon, Image, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IBlog } from '../../../app/models/blog';
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';

const BlogCardItem: React.FC<{ blog: IBlog }> = ({ blog }) => {
	const owner = blog.attendees[0];

	return (
		<Card>
			<Image
				as={Link}
				to={`/blogs/${blog.id}`}
				src='/assets/placeholder.png'
				wrapped
				ui={false}
			/>

			<Card.Content
				style={{
					padding: '20px'
				}}
			>
				<Card.Header style={{marginBottom: '15px'}} as={Link} to={`/blogs/${blog.id}`}>
					{blog.title}
				</Card.Header>

				<Card.Meta>
					{' '}
					<Label style={{marginBottom: '15px'}} color='violet'>{blog.category}</Label>
				</Card.Meta>
				<Card.Meta>
					Postuar nga:{' '}
					<Link to={`/profile/${owner.username!}`}>{owner.displayName!}</Link>
				</Card.Meta>
			</Card.Content>
			<div style={{ paddingBottom: '5px', textAlign: 'center' }}>
				<Icon name='clock' /> {format(blog.date, 'eeee do MMMM')} at{' '}
				{format(blog.date, 'h:mm a')}
			</div>
		</Card>
	);
};

export default observer(BlogCardItem);
