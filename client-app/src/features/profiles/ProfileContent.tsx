import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfileDescription from './ProfileDescription';
import ProfilePhotos from './ProfilePhotos';
import ProfileProducts from './ProfileProducts';
import ProfileJobs from './ProfileJobs';
import Users from '../admin/Users';
import Products from '../admin/Products';
import Jobs from '../admin/Jobs';
import Messages from '../admin/Messages';
import { useContext } from 'react';
import { RootStoreContext } from '../../app/stores/rootStore';

let panes: any = undefined;



interface IProps {
	match: any;
}

const ProfileContent: React.FC<IProps> = ({match}) => {
	const rootStore = useContext(RootStoreContext);
	const { isCurrentUserAdmin, profile, isAdmin } = rootStore.profileStore!;


	if (isCurrentUserAdmin && match.params.username === profile!.username && isAdmin) {
		panes = [
			{
				menuItem: 'Përdoruesit',
				render: () => <Users />,
			},
			{
				menuItem: 'Produktet',
				render: () => <Products />,
			},
			{
				menuItem: 'Shpalljet e punës',
				render: () => <Jobs />,
			},
			{
				menuItem: 'Mesazhet',
				render: () => <Messages />,
			},
		];
	}else{
		panes = [
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
