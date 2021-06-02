import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item } from 'semantic-ui-react';
import { IAttendee } from '../../../app/models/product';

interface IProps {
	attendees: IAttendee[];
}

const ProductDetailedSidebar: React.FC<IProps> = ({ attendees }) => {
	return (
		<Segment.Group>
			{attendees.map((attendee) => (
				<Segment style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
					<Item.Group>
						<Item>
							
							<Item.Image
						
								size='small'
								circular
								src={attendee.image || '/assets/user.png'}
							/>
							
						</Item>
					</Item.Group>

					<Item.Header as='h2'>
						<Link to={`/profile/${attendee.username}`}>{attendee.displayName}</Link>
					</Item.Header>
					
					<div>{attendee.city}</div>
					<div>{attendee.phoneNumber}</div>
				</Segment>
			))}
		</Segment.Group>
	);
};

export default observer(ProductDetailedSidebar);
