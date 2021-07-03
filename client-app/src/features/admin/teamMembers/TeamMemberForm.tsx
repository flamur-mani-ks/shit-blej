import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { ITeamMember } from '../../../app/models/teamMember';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { useEffect } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { BlogFormValues } from '../../../app/models/blog';

interface IProps {
	teamMember: ITeamMember;
}

const TeamMemberForm: React.FC<IProps> = ({ teamMember: initialFormState }) => {
	const rootStore = useContext(RootStoreContext);
	const { createTeamMember, editTeamMember, submitting, cancelFormOpen } =
		rootStore.teamMemberStore;
	const initializeForm = () => {
		if (initialFormState) {
			return initialFormState;
		} else {
			return {
				id: '',
				fullName: '',
				position: '',
				bio: '',
				facebook: '',
				twitter: '',
				github: '',
				linkedIn: '',
			};
		}
	};

	const [teamMember, setTeamMember] = useState<ITeamMember>(initializeForm);
	const { loadTeamMemberPositions, teamMemberPositionsArr } =
		rootStore.teamMemberPositionStore;

	useEffect(() => {
		loadTeamMemberPositions();
	}, [loadTeamMemberPositions]);

	let teamMemberPositionsArray: any = [];

	for (let i = 0; i < teamMemberPositionsArr.length; i++) {
		teamMemberPositionsArray.push({
			key: teamMemberPositionsArr[i].position,
			text: teamMemberPositionsArr[i].position,
			value: teamMemberPositionsArr[i].position,
		});
	}

	const handleFinalFormSubmit = (values: any) => {
		const { ...teamMember } = values;
		if (teamMember.id.length === 0) {
			let newTeamMember = {
				...teamMember,
				id: uuid(),
			};
			createTeamMember(newTeamMember);
		} else {
			editTeamMember(teamMember);
		}
	};

	return (
		<Segment clearing>
			<FinalForm
				initialValues={teamMember}
				onSubmit={handleFinalFormSubmit}
				render={({ handleSubmit, invalid, pristine }) => (
					<Form onSubmit={handleSubmit}>
						<Field
							name='fullName'
							placeholder='Emri & Mbiemri'
							value={teamMember.fullName}
							component={TextInput}
						/>
						<Field
							name='position'
							placeholder='Pozita'
							value={teamMember.position}
							component={SelectInput}
							options={teamMemberPositionsArray}
						/>
						<Field
							name='bio'
							placeholder='Bio'
							value={teamMember.bio}
							rows={3}
							component={TextAreaInput}
						/>
						<Field
							name='facebook'
							placeholder='Facebook link'
							value={teamMember.facebook}
							component={TextInput}
						/>
						<Field
							name='twitter'
							placeholder='Twitter link'
							value={teamMember.twitter}
							component={TextInput}
						/>
						<Field
							name='github'
							placeholder='Github link'
							value={teamMember.github}
							component={TextInput}
						/>
						<Field
							name='linkedIn'
							placeholder='LinkedIn link'
							value={teamMember.linkedIn}
							component={TextInput}
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
				)}
			/>
		</Segment>
	);
};

export default observer(TeamMemberForm);
