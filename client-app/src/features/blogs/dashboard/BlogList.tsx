import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import BlogCardItem from './BlogCardItem';

const BlogList: React.FC = () => {
	const rootStore = useContext(RootStoreContext);
	const { blogsByDate } = rootStore.blogStore;

	return (
		<Card.Group itemsPerRow={4}>
        {blogsByDate.map((blog) => (
          <BlogCardItem key={blog.id} blog={blog} />
        ))}
      </Card.Group>
	);
};

export default observer(BlogList);