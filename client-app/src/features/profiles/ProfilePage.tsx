import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../app/stores/rootStore';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';

interface RouteParams {
	username: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

const ProfilePage: React.FC<IProps> = ({ match }) => {
	const rootStore = useContext(RootStoreContext);
	const {
		loadingProfile,
		profile,
		loadProfile,
		follow,
		unfollow,
		isCurrentUser,
		loading,
		isCurrentUserAdmin,
		setActiveTab,
		isAdmin
	} = rootStore.profileStore;

	const { isLoggedIn } = rootStore.userStore!;

	useEffect(() => {
		loadProfile(match.params.username);
	}, [loadProfile, match]);

	if (loadingProfile) return <LoadingComponent content='Loading profile...' />;

	return (
		<Grid>
			<Grid.Column width={16}>
				{!isCurrentUserAdmin && (
					<ProfileHeader
						profile={profile!}
						isCurrentUser={isCurrentUser}
						isAdmin={isAdmin}
						loading={loading}
						follow={follow}
						unfollow={unfollow}
						isLoggedIn={isLoggedIn}
					/>
				)}
				<ProfileContent match={match} setActiveTab={setActiveTab} />
			</Grid.Column>
		</Grid>
	);
};

export default observer(ProfilePage);
