import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import TeamMemberList from './TeamMemberList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

const TeamMemberDashboard: React.FC = () => {
	const rootStore = useContext(RootStoreContext);
	const  {loadTeamMembers, loadingInitial} = rootStore.teamMemberStore;

	useEffect(() => {
		loadTeamMembers();
	}, [loadTeamMembers]);

	if (loadingInitial)
		return <LoadingComponent content='Loading team' />;
		
	return (
		<Grid>
      <Grid.Column width={1}></Grid.Column>
			<Grid.Column width={14}>
				<TeamMemberList />
			</Grid.Column>
      
			
		</Grid>
	);
};

export default observer(TeamMemberDashboard);