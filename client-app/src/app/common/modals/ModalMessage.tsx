import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const ModalMessage: React.FC<{ message?: string; iconName?: any }> = ({
	message,
	iconName,
}) => {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
			<Header
				as='h3'
				content={message}
				textAlign='center'
				color='green'
			></Header>
			{iconName && <Icon name={iconName} color='green' />}
		</div>
	);
};

export default ModalMessage;
