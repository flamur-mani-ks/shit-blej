import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Item } from 'semantic-ui-react';
import { IAttendee } from '../../../app/models/product';

interface IProps {
	attendees: IAttendee[];
}

const ProductItemOwner: React.FC<IProps> = ({ attendees }) => {
	return (
		<Fragment>
			{attendees.map((attendee) => (
				<Item.Description key={attendee.username}>
					{' '}
					Postuar nga: <Link to={`/profile/${attendee.username}`}>{attendee.displayName}</Link>
				</Item.Description>
			))}
		</Fragment>
	);
};

export default observer(ProductItemOwner);
