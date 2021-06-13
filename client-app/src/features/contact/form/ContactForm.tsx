import React, { useState, useContext } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { city } from '../../../app/common/options/cityOptions';
import { ContactFormValues } from '../../../app/models/contact';
import {
	combineValidators,
	isRequired,
	composeValidators,
	hasLengthGreaterThan,
	matchesPattern,
} from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ModalMessage from '../../../app/common/modals/ModalMessage';

const citiesWithoutAllOption = city.slice(1, city.length);

const isEmail = matchesPattern(
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const validate = combineValidators({
	fullName: isRequired({ message: 'Emri dhe mbiemri është i detyrueshëm' }),
	email: composeValidators(
		isRequired({ message: 'Emaili është i detyrueshëm' }),
		isEmail({ message: 'Emaili duhet të jet valid', })
	)(),
	message: composeValidators(
		isRequired({ message: 'Mesazhi është i detyrueshëm' }),
		hasLengthGreaterThan(4)({
			message: 'Mesazhi duhet të jet së paku 5 karaktere i gjat',
		})
	)(),
});

const ContactForm: React.FC = () => {
	const rootStore = useContext(RootStoreContext);
	const { createContact, submitting } = rootStore.contactStore;
  const { openModal } = rootStore.modalStore;

	const [contact] = useState(new ContactFormValues());
	const [loading] = useState(false);

	const handleFinalFormSubmit = (values: any) => {
		const { date, time, ...contact } = values;
		
		if (!contact.id) {
			let newContact = {
				...contact,
				id: uuid(),
				date: moment().format('YYYY-MM-DD hh:mm:ss'),
			};
			createContact(newContact);
      setTimeout(() => window.location.reload(), 2000);
		}
	};

	return (
		<Grid centered>
			<Grid.Column width={10}>
				<Segment clearing>
					<FinalForm
						validate={validate}
						initialValues={contact}
						onSubmit={handleFinalFormSubmit}
						render={({ handleSubmit, invalid, pristine }) => (
							<Form onSubmit={handleSubmit} loading={loading}>
								<Field
									name='fullName'
									placeholder='Emri dhe Mbiemri'
									type='text'
									component={TextInput}
								/>
								<Field
									name='phoneNumber'
									placeholder='Numri i telefonit  (Opsional)'
									type='text'
									component={TextInput}
								/>
								<Field
									name='email'
									placeholder='Email adresa'
									type='email'
									component={TextInput}
								/>

								<Field
									name='city'
									placeholder='Qyteti  (Opsional)'
									value={contact.city}
									component={SelectInput}
									options={citiesWithoutAllOption}
								/>
								<Field
									name='message'
									placeholder='Shëno mesazhin'
									rows={4}
									component={TextAreaInput}
								/>

								<Button
									loading={submitting}
									floated='right'
									positive
									type='submit'
									content='Submit'
									disabled={loading || invalid || pristine}
									onClick={() => openModal(<ModalMessage message='Mesazhi u dërgua me sukses' iconName='send' />)}
								/>
								
							</Form>
						)}
					/>
				</Segment>
			</Grid.Column>
		</Grid>
	);
};

export default observer(ContactForm);
