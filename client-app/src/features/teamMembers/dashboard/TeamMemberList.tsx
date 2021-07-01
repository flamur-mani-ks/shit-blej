import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Fragment } from 'react';
import { Card, Header } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import TeamMemberCardItem from './TeamMemberCardItem';

const TeamMemberList: React.FC = () => {
	const rootStore = useContext(RootStoreContext);
	const { teamMembersArr } = rootStore.teamMemberStore;

	return (
		<Fragment>
			<Header
				as='h1'
				content='Njoftohu me ekipin zhvillues'
				textAlign='center'
				style={{ marginBottom: '30px', fontSize: '40px' }}
			></Header>

			<Card.Group itemsPerRow={3}>
				{teamMembersArr.map((teamMember) => (
					<TeamMemberCardItem key={teamMember.id} teamMember={teamMember} />
				))}
			</Card.Group>
		</Fragment>
	);
};

export default observer(TeamMemberList);
