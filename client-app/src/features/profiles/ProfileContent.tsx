import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfileDescription from './ProfileDescription';
import ProfilePhotos from './ProfilePhotos';
import ProfileProducts from './ProfileProducts';
import ProfileJobs from './ProfileJobs';
import { useContext } from 'react';
import { RootStoreContext } from '../../app/stores/rootStore';

let panes = [
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
	const rootStore = useContext(RootStoreContext);
	const { isCurrentUserAdmin } = rootStore.profileStore!;

	if (isCurrentUserAdmin) {
		panes = [
			{
				menuItem: 'Përdoruesit',
				render: () => <Tab.Pane>Lista e te gjithe userav</Tab.Pane>,
			},
			{
				menuItem: 'Produktet',
				render: () => <Tab.Pane>Lista e te gjithe produktev</Tab.Pane>,
			},
			{
				menuItem: 'Shpalljet e punës',
				render: () => <Tab.Pane>Lista e te gjithe shpalljeve te punes</Tab.Pane>,
			},
			{
				menuItem: 'Mesazhet',
				render: () => <Tab.Pane>Lista e te gjithe mesazheve</Tab.Pane>,
			},
		];
	}

	return (
		<Tab
			menu={{ fluid: true, vertical: true }}
			menuPosition='right'
			panes={panes}
		/>
	);
};

export default observer(ProfileContent);
