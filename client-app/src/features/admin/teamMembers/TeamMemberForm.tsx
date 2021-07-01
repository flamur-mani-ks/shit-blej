import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { ITeamMember } from '../../../app/models/teamMember';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';

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
        linkedIn: ''
			};
		}
	};

	const [teamMember, setTeamMember] = useState<ITeamMember>(initializeForm);

	const handleSubmit = () => {
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

	const handleInputChange = (
		event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.currentTarget;
		setTeamMember({ ...teamMember, [name]: value });
	};

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit}>
				<Form.Input
					onChange={handleInputChange}
					name='fullName'
					placeholder='Emri & Mbiemri'
					value={teamMember.fullName}
				/>
        <Form.Input
					onChange={handleInputChange}
					name='position'
					placeholder='Pozita'
					value={teamMember.position}
				/>
				<Form.TextArea
					onChange={handleInputChange}
					name='bio'
					placeholder='Bio'
					value={teamMember.bio}
				/>
        <Form.Input
					onChange={handleInputChange}
					name='facebook'
					placeholder='Facebook link'
					value={teamMember.facebook}
				/>
        <Form.Input
					onChange={handleInputChange}
					name='twitter'
					placeholder='Twitter link'
					value={teamMember.twitter}
				/>
          <Form.Input
					onChange={handleInputChange}
					name='github'
					placeholder='Github link'
					value={teamMember.github}
				/>
          <Form.Input
					onChange={handleInputChange}
					name='linkedIn'
					placeholder='LinkeIn link'
					value={teamMember.linkedIn}
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

export default observer(TeamMemberForm);
