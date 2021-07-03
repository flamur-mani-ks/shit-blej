import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { ITeamMemberPosition } from '../../../app/models/teamMemberPosition';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface IProps {
	teamMemberPosition: ITeamMemberPosition;
}

const TeamMemberPositionForm: React.FC<IProps> = ({
	teamMemberPosition: initialFormState,
}) => {
	const rootStore = useContext(RootStoreContext);
	const {
		createTeamMemberPosition,
		editTeamMemberPosition,
		submitting,
		cancelFormOpen,
	} = rootStore.teamMemberPositionStore;
	const initializeForm = () => {
		if (initialFormState) {
			return initialFormState;
		} else {
			return {
				id: '',
				position: '',
			};
		}
	};

	const [teamMemberPosition, setTeamMemberPosition] =
		useState<ITeamMemberPosition>(initializeForm);

	const handleSubmit = () => {
		if (teamMemberPosition.id.length === 0) {
			let newTeamMemberPosition = {
				...teamMemberPosition,
				id: uuid(),
			};
			createTeamMemberPosition(newTeamMemberPosition);
		} else {
			editTeamMemberPosition(teamMemberPosition);
		}
	};

	const handleInputChange = (
		event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.currentTarget;
		setTeamMemberPosition({ ...teamMemberPosition, [name]: value });
	};

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit}>
				<Form.Input
					onChange={handleInputChange}
					name='position'
					placeholder='Pozita'
					value={teamMemberPosition.position}
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

export default observer(TeamMemberPositionForm);
