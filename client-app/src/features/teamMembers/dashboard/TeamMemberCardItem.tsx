import React from 'react';
import { Card, Header, Icon, Image } from 'semantic-ui-react';
import { ITeamMember } from '../../../app/models/teamMember';
import { observer } from 'mobx-react-lite';

const TeamMemberCardItem: React.FC<{ teamMember: ITeamMember }> = ({
	teamMember,
}) => {
	return (
		<Card>
			<Image
				src={`/assets/team/${teamMember.fullName
					.toLowerCase()
					.replace(/ /g, '')}.jpg`}
				wrapped
				ui={false}
			/>

			<Card.Content
				style={{
					padding: '20px',
				}}
			>
				<Card.Header style={{ marginBottom: '15px' }}>
					{teamMember.fullName}
				</Card.Header>

				<Card.Meta>
					<Header as='h5' content={teamMember.position} style={{marginBottom: '10px'}}></Header>
				</Card.Meta>
				<Card.Meta>{teamMember.bio}</Card.Meta>
				<Card.Content extra className='member-social-links'>
					{teamMember.facebook && (
						<a href={teamMember.facebook} rel="noopener noreferrer" target="_blank">
							<Icon name='facebook f' size='large' />
						</a>
					)}
					{teamMember.twitter && (
						<a href={teamMember.twitter} rel="noopener noreferrer" target="_blank">
							<Icon name='twitter' size='large' style={{color: 'deepskyblue'}} />
						</a>
					)}
					{teamMember.github && (
						<a href={teamMember.github} rel="noopener noreferrer" target="_blank">
							<Icon name='github' size='large' style={{color: 'black'}} />
						</a>
					)}
					{teamMember.linkedIn && (
						<a href={teamMember.linkedIn} rel="noopener noreferrer" target="_blank">
							<Icon name='linkedin' size='large' style={{color: '#0072B1'}} />
						</a>
					)}
				</Card.Content>
			</Card.Content>
		</Card>
	);
};

export default observer(TeamMemberCardItem);
