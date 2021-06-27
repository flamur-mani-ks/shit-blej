import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IBlogCategory } from '../../../app/models/blogCategory';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface IProps {
	blogCategory: IBlogCategory;
}

const BlogCategoryForm: React.FC<IProps> = ({ blogCategory: initialFormState }) => {
	const rootStore = useContext(RootStoreContext);
	const { createBlogCategory, editBlogCategory, submitting, cancelFormOpen } =
		rootStore.blogCategoryStore;
	const initializeForm = () => {
		if (initialFormState) {
			return initialFormState;
		} else {
			return {
				id: '',
				category: ''
			};
		}
	};

	const [blogCategory, setBlogCategory] = useState<IBlogCategory>(initializeForm);

	const handleSubmit = () => {
		if (blogCategory.id.length === 0) {
			let newBlogCategory = {
				...blogCategory,
				id: uuid(),
			};
			createBlogCategory(newBlogCategory);
		} else {
			editBlogCategory(blogCategory);
		}
	};

	const handleInputChange = (
		event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.currentTarget;
		setBlogCategory({ ...blogCategory, [name]: value });
	};

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit}>
				<Form.Input
					onChange={handleInputChange}
					name='category'
					placeholder='Kategoria'
					value={blogCategory.category}
				/>
				
				<Button
					loading={submitting}
					floated='right'
					positive
					type='submit'
					content='Submit'
				/>
				<Button
					onClick={cancelFormOpen}
					floated='right'
					type='button'
					content='Cancel'
				/>
			</Form>
		</Segment>
	);
};

export default observer(BlogCategoryForm);
