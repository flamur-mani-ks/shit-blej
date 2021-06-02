import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfilePhotos from './ProfilePhotos';

const panes = [
	{
		menuItem: 'Të dhënat personale',
		render: () => <Tab.Pane>Te dhenat personale</Tab.Pane>,
	},
	{
		menuItem: 'Fotot',
		render: () => <ProfilePhotos />,
	},
	{
		menuItem: 'Produktet',
		render: () => <Tab.Pane>Te gjitha produktet</Tab.Pane>,
	},
];

const ProfileContent = () => {
	return (
		<Tab
			menu={{ fluid: true, vertical: true }}
			menuPosition='right'
			panes={panes}
		/>
	);
};

export default observer(ProfileContent);
