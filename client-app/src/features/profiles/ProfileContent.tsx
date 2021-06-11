import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfileDescription from './ProfileDescription';
import ProfilePhotos from './ProfilePhotos';
import ProfileProducts from './ProfileProducts';
import ProfileJobs from './ProfileJobs';

const panes = [
	{
		menuItem: 'Të dhënat personale',
		render: () => <ProfileDescription />,
	},
	{
		menuItem: 'Fotot',
		render: () => <ProfilePhotos />,
	},
	{
		menuItem: 'Produktet',
		render: () => <ProfileProducts />,
	},
	{
		menuItem: 'Shpalljet e punës',
		render: () => <ProfileJobs />,
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
