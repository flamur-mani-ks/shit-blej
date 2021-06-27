import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IJobCategory } from '../../../app/models/jobCategory';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface IProps {
	jobCategory: IJobCategory;
}

const JobCategoryForm: React.FC<IProps> = ({ jobCategory: initialFormState }) => {
	const rootStore = useContext(RootStoreContext);
	const { createJobCategory, editJobCategory, submitting, cancelFormOpen } =
		rootStore.jobCategoryStore;
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

	const [jobCategory, setJobCategory] = useState<IJobCategory>(initializeForm);

	const handleSubmit = () => {
		if (jobCategory.id.length === 0) {
			let newJobCategory = {
				...jobCategory,
				id: uuid(),
			};
			createJobCategory(newJobCategory);
		} else {
			editJobCategory(jobCategory);
		}
	};

	const handleInputChange = (
		event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.currentTarget;
		setJobCategory({ ...jobCategory, [name]: value });
	};

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit}>
				<Form.Input
					onChange={handleInputChange}
					name='category'
					placeholder='Kategoria'
					value={jobCategory.category}
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

export default observer(JobCategoryForm);
