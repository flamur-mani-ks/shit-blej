// import React, { useState, useContext, useEffect } from 'react';
// import { Segment, Form, Button, Grid } from 'semantic-ui-react';
// import { v4 as uuid } from 'uuid';
// import moment from 'moment';
// import { observer } from 'mobx-react-lite';
// import { RouteComponentProps } from 'react-router';
// import { Form as FinalForm, Field } from 'react-final-form';
// import TextInput from '../../app/common/form/TextInput';
// import TextAreaInput from '../../app/common/form/TextAreaInput';
// import SelectInput from '../../app/common/form/SelectInput';
// import { city } from '../../app/common/options/cityOptions';
// import { ContactFormValues } from '../../app/models/contact';
// import {
// 	combineValidators,
// 	isRequired,
// 	composeValidators,
// 	hasLengthGreaterThan,
// } from 'revalidate';
// import { RootStoreContext } from '../../app/stores/rootStore';

// const citiesWithoutAllOption = city.slice(1,city.length);
// const validate = combineValidators({
// 	fullName: isRequired({ message: 'Emri dhe mbiemri është i detyrueshëm' }),
//   email: isRequired({message: 'Emaili është i detyrushëm'}),
// 	message: composeValidators(
// 		isRequired({ message: 'Mesazhi është i detyrueshëm' }),
// 		hasLengthGreaterThan(4)({
// 			message: 'Mesazhi duhet të jet së paku 5 karaktere i gjat',
// 		})
// 	)(),
// });

// interface DetailParams {
// 	id: string;
// }

// const ContactForm: React.FC<RouteComponentProps<DetailParams>> = ({
// 	match,
// 	history,
// }) => {
// 	const rootStore = useContext(RootStoreContext);
// 	const { createContact, editContact, submitting, loadContact, deleteContact } =
// 		rootStore.contactStore;

// 	const [contact, setContact] = useState(new ContactFormValues());
// 	const [loading, setLoading] = useState(false);

// 	useEffect(() => {
// 		if (match.params.id) {
// 			setLoading(true);
// 			loadContact(match.params.id)
// 				.then((contact) => {
// 					setContact(new ContactFormValues(contact));
// 				})
// 				.finally(() => setLoading(false));
// 		}
// 	}, [loadContact, match.params.id]);

// 	const handleFinalFormSubmit = (values: any) => {
// 		// const dateAndTime = combineDateAndTime(values.date, values.time);
// 		const { date, time, ...contact } = values;
// 		// contact.date = dateAndTime;
// 		if (!contact.id) {
// 			let newContact = {
// 				...contact,
// 				id: uuid(),
// 				date: moment().format('YYYY-MM-DD hh:mm:ss'),
// 			};
// 			createContact(newContact);
// 		} else {
// 			editContact(contact);
// 		}
// 	};

// 	return (
// 		<Grid>
// 			<Grid.Column width={10}>
// 				<Segment clearing>
// 					<FinalForm
// 						validate={validate}
// 						initialValues={contact}
// 						onSubmit={handleFinalFormSubmit}
// 						render={({ handleSubmit, invalid, pristine }) => (
// 							<Form onSubmit={handleSubmit} loading={loading}>
// 								<Field
// 									name='title'
// 									placeholder='Title'
// 									value={contact.title}
// 									component={TextInput}
// 								/>
// 								<Field
// 									name='description'
// 									placeholder='Description'
// 									rows={3}
// 									value={contact.description}
// 									component={TextAreaInput}
// 								/>
// 								<Field
// 									name='category'
// 									placeholder='Category'
// 									value={contact.category}
// 									component={SelectInput}
// 									options={categoriesWithoutAllOption}
// 								/>
// 								{/* <Form.Group widths='equal'>
//                   <Field
//                     component={DateInput}
//                     name='date'
//                     date={true}
//                     placeholder='Date'
//                     value={contact.date}
//                   />
//                   <Field
//                     component={DateInput}
//                     name='time'
//                     time={true}
//                     placeholder='Time'
//                     value={contact.time}
//                   />
//                 </Form.Group> */}
// 								<Field
// 									name='city'
// 									placeholder='City'
// 									value={contact.city}
// 									component={SelectInput}
// 									options={citiesWithoutAllOption}
// 								/>

// 								<Field
// 									type='number'
// 									name='price'
// 									placeholder='Price'
// 									/*
//       						// @ts-ignore */
// 									value={contact.price}
// 									/*
//       						// @ts-ignore */
// 									component={TextInput}
// 								/>
// 								<Button
// 									loading={submitting}
// 									floated='right'
// 									positive
// 									type='submit'
// 									content='Submit'
// 									disabled={loading || invalid || pristine}
// 								/>
// 								<Button
// 									onClick={
// 										contact.id
// 											? () => history.push(`/contacts/${contact.id}`)
// 											: () => history.push('/contacts')
// 									}
// 									floated='right'
// 									type='button'
// 									content='Cancel'
// 									disabled={loading}
// 								/>
// 								{contact.id && (
// 									<Button
// 									onClick={(e) => {deleteContact(e, contact.id!); history.push('/contacts');} }
// 										loading={submitting}
// 										name={contact.id}
// 										floated='right'
// 										negative
// 										type='submit'
// 										content='Delete'
// 										disabled={loading}
// 									/>
// 								)}
// 							</Form>
// 						)}
// 					/>
// 				</Segment>
// 			</Grid.Column>
// 		</Grid>
// 	);
// };

// export default observer(ContactForm);

import React from 'react'

const ContactForm = () => {
  return (
    <div>
      
    </div>
  )
}

export default ContactForm
