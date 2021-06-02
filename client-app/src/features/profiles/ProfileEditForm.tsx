import React from 'react';
import { IProfile } from '../../app/models/profile';
import { Form as FinalForm, Field } from 'react-final-form';
import { observer } from 'mobx-react-lite';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Button } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import SelectInput from '../../app/common/form/SelectInput';
import { city } from '../../app/common/options/cityOptions';

const validate = combineValidators({
	displayName: isRequired({message: 'Display Name është i detyrueshëm'}),
});

interface IProps {
	updateProfile: (profile: Partial<IProfile>) => void;
	profile: IProfile;
}

const ProfileEditForm: React.FC<IProps> = ({ updateProfile, profile }) => {
	return (
		<FinalForm
			onSubmit={updateProfile}
			validate={validate}
			initialValues={profile!}
			render={({ handleSubmit, invalid, pristine, submitting }) => (
				<Form onSubmit={handleSubmit} error>
					<Field
						name='displayName'
						component={TextInput}
						placeholder='Display Name'
						value={profile!.displayName}
					/>
					<Field
						name='phoneNumber'
						component={TextInput}
						rows={3}
						placeholder='Numri i telefonit'
						value={profile!.phoneNumber}
					/>
					<Field
						name='city'
						placeholder='City'
						value={profile!.city}
						component={SelectInput}
						options={city}
					/>
					<Button
						loading={submitting}
						floated='right'
						disabled={invalid || pristine}
						positive
						content='Update profile'
					/>
				</Form>
			)}
		/>
	);
};

export default observer(ProfileEditForm);
