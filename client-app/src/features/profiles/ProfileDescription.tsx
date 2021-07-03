import React, { Fragment, useContext, useState } from 'react';
import { Tab, Grid, Header, Button } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import ProfileEditForm from './ProfileEditForm';
import { observer } from 'mobx-react-lite';

const ProfileDescription = () => {
	const rootStore = useContext(RootStoreContext);
	const { updateProfile, profile, isCurrentUser } = rootStore.profileStore;
	const [editMode, setEditMode] = useState(false);

	return (
		<Tab.Pane>
			<Grid>
				<Grid.Column width={16}>
					<Header
					as='h2'
						floated='left'
						icon='user'
						content={`Rreth ${profile!.displayName}`}
					/>
					{ isCurrentUser && (

						<Button
							floated='right'
							basic
							content={editMode ? 'Cancel' : 'Përditëso profilin'}
							onClick={() => setEditMode(!editMode)}
						/>
					)}
				</Grid.Column>
				<Grid.Column width={16}>
					{editMode ? (
						<ProfileEditForm updateProfile={updateProfile} profile={profile!} />
					) : (
						<Fragment>
							<Header style={{}} as='h3' content={`Numri i telefonit: ${profile!.phoneNumber}`}></Header>
							<Header as='h3' content={`Qyteti: ${profile!.city}`}></Header>
						</Fragment>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(ProfileDescription);
