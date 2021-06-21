import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { blogCategories } from '../../../app/common/options/blogCategoryOptions';
import { BlogFormValues } from '../../../app/models/blog';
import {
	combineValidators,
	isRequired,
	composeValidators,
	hasLengthGreaterThan,
} from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/util';

const validate = combineValidators({
	title: isRequired({ message: 'Titulli i blogut është i detyrueshëm' }),
	category: isRequired({
		message: 'Kategoria e blogut është e detyrueshme',
	}),
	body: composeValidators(
		isRequired({ message: 'Trupi i blogut është i detyrueshëm' }),
		hasLengthGreaterThan(4)({
			message: 'Trupi duhet të jet së paku 5 karaktere i gjat',
		})
	)(),
});

interface DetailParams {
	id: string;
}

const BlogForm: React.FC<RouteComponentProps<DetailParams>> = ({
	match,
	history,
}) => {
	const rootStore = useContext(RootStoreContext);
	const { createBlog, editBlog, submitting, loadBlog, deleteBlog } =
		rootStore.blogStore;

	const [blog, setBlog] = useState(new BlogFormValues());
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (match.params.id) {
			setLoading(true);
			loadBlog(match.params.id)
				.then((blog) => {
					setBlog(new BlogFormValues(blog));
				})
				.finally(() => setLoading(false));
		}
	}, [loadBlog, match.params.id]);

	const handleFinalFormSubmit = (values: any) => {
		const dateAndTime = combineDateAndTime(values.date, values.time);
		const { date, time, ...blog } = values;
		blog.date = dateAndTime;
    blog.time = dateAndTime;
		if (!blog.id) {
			let newBlog = {
				...blog,
				id: uuid(),
				date: moment().format('YYYY-MM-DD hh:mm:ss'),
			};
			createBlog(newBlog);
		} else {
			editBlog(blog);
		}
	};

	return (
		<Grid>
			<Grid.Column width={10}>
				<Segment clearing>
					<FinalForm
						validate={validate}
						initialValues={blog}
						onSubmit={handleFinalFormSubmit}
						render={({ handleSubmit, invalid, pristine }) => (
							<Form onSubmit={handleSubmit} loading={loading}>
								<Field
									name='title'
									placeholder='Titulli'
									value={blog.title}
									component={TextInput}
								/>
								<Field
									name='body'
									placeholder='Trupi'
									rows={7}
									value={blog.body}
									component={TextAreaInput}
								/>
								<Field
									name='category'
									placeholder='Kategoria'
									value={blog.category}
									component={SelectInput}
									options={blogCategories}
								/>
								<Form.Group widths='equal'>
                  <Field
                    component={DateInput}
                    name='date'
                    date={true}
                    placeholder='Data'
                    value={blog.date}
                  />
                  <Field
                    component={DateInput}
                    name='time'
                    time={true}
                    placeholder='Ora'
                    value={blog.time}
                  />
                </Form.Group>
								<Button
									loading={submitting}
									floated='right'
									positive
									type='submit'
									content='Submit'
									disabled={loading || invalid || pristine}
								/>
								<Button
									onClick={
										blog.id
											? () => history.push(`/blogs/${blog.id}`)
											: () => history.push('/blogs')
									}
									floated='right'
									type='button'
									content='Cancel'
									disabled={loading}
								/>
								{blog.id && (
									<Button
									onClick={(e) => {deleteBlog(e, blog.id!); history.push('/blogs');} }
										loading={submitting}
										name={blog.id}
										floated='right'
										negative
										type='submit'
										content='Delete'
										disabled={loading}
									/>
								)}
							</Form>
						)}
					/>
				</Segment>
			</Grid.Column>
		</Grid>
	);
};

export default observer(BlogForm);
