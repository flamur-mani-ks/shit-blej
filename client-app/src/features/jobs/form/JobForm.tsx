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
import { jobCategories } from '../../../app/common/options/jobCategoryOptions';
import { city } from '../../../app/common/options/cityOptions';
import {workingHoursOptions} from '../../../app/common/options/workingHoursOptions';
import { JobFormValues } from '../../../app/models/job';
import {
	combineValidators,
	isRequired,
	composeValidators,
	hasLengthGreaterThan,
} from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/util';
import { format } from 'date-fns';

const citiesWithoutAllOption = city.slice(1, city.length);
const validate = combineValidators({
	title: isRequired({ message: 'Titulli i punës është i detyrueshëm' }),
	category: isRequired({
		message: 'Kategoria e punës është e detyrueshme',
	}),
	description: composeValidators(
		isRequired({ message: 'Përshkrimi i punës është i detyrueshëm' }),
		hasLengthGreaterThan(4)({
			message: 'Përshkrimi duhet të jet së paku 5 karaktere i gjat',
		})
	)(),
	city: isRequired({ message: 'Qyteti i punës është i detyrueshëm' }),
	workingHours: isRequired({ message: 'Orari i punës është i detyrueshëm' }),
});

interface DetailParams {
	id: string;
}

const JobForm: React.FC<RouteComponentProps<DetailParams>> = ({
	match,
	history,
}) => {
	const rootStore = useContext(RootStoreContext);
	const { createJob, editJob, submitting, loadJob, deleteJob } =
		rootStore.jobStore;

	const [job, setJob] = useState(new JobFormValues());
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (match.params.id) {
			setLoading(true);
			loadJob(match.params.id)
				.then((job) => {
					setJob(new JobFormValues(job));
				})
				.finally(() => setLoading(false));
		}
	}, [loadJob, match.params.id]);

	const handleFinalFormSubmit = (values: any) => {
		const dateAndTime = combineDateAndTime(values.date, values.time);
		const { date, time, ...job } = values;
		job.expiresAt = dateAndTime;
		
		if (!job.id) {
			let newJob = {
				...job,
				id: uuid(),
				createdAt: moment().format('YYYY-MM-DD hh:mm:ss')
			};
			createJob(newJob);
		} else {
			editJob(job);
		}
	};

	/*
      // @ts-ignore */
			const dateExp: Date = format(new Date(job.expiresAt), 'yyyy-MM-dd')

	return (
		<Grid>
			<Grid.Column width={10}>
				<Segment clearing>
					<FinalForm
						validate={validate}
						initialValues={job}
						onSubmit={handleFinalFormSubmit}
						render={({ handleSubmit, invalid, pristine }) => (
							<Form onSubmit={handleSubmit} loading={loading}>
								<Field
									name='title'
									placeholder='Titulli'
									value={job.title}
									component={TextInput}
								/>
								<Field
									name='description'
									placeholder='Përshkrimi i punës'
									rows={3}
									value={job.description}
									component={TextAreaInput}
								/>
								<Field
									name='category'
									placeholder='Kategoria'
									value={job.category}
									component={SelectInput}
									options={jobCategories}
								/>
								<Form.Group widths='equal'>
									<Field
										/*
      							// @ts-ignore */
										component={DateInput}
										name='date'
										date={true}
										placeholder='Data Skadimit'
											/*
      // @ts-ignore */
										value={dateExp}
										
									/>
									<Field
										component={DateInput}
										name='time'
										time={true}
										placeholder='Ora'
										value={job.expiresAt}
									/>
								</Form.Group>
								<Field
									name='city'
									placeholder='Qyteti'
									value={job.city}
									component={SelectInput}
									options={citiesWithoutAllOption}
								/>

								<Field
									name='workingHours'
									placeholder='Orai i punës'
									value={job.workingHours}
									component={SelectInput}
									options={workingHoursOptions}
								/>
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
										job.id
											? () => history.push(`/jobs/${job.id}`)
											: () => history.push('/jobs')
									}
									floated='right'
									type='button'
									content='Cancel'
									disabled={loading}
								/>
								{job.id && (
									<Button
										onClick={(e) => {
											deleteJob(e, job.id!);
											history.push('/jobs');
										}}
										loading={submitting}
										name={job.id}
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

export default observer(JobForm);
