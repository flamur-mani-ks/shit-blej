import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfileDescription from './ProfileDescription';
import ProfilePhotos from './ProfilePhotos';
import ProfileProducts from './ProfileProducts';
import ProfileJobs from './ProfileJobs';
import ProfileBlogs from './ProfileBlogs';
import Users from '../admin/Users';
import Products from '../admin/products/Products';
import Jobs from '../admin/jobs/Jobs';
import Messages from '../admin/Messages';
import Blogs from '../admin/blogs/Blogs';
import Cities from '../admin/cities/Cities';
import BlogCategories from '../admin/blogs/BlogCategories';
import JobCategories from '../admin/jobs/JobCategories';
import ProductCategories from '../admin/products/ProductCategories';
import { useContext } from 'react';
import { RootStoreContext } from '../../app/stores/rootStore';
import ProfileFollowings from './ProfileFollowings';
import TeamMembers from '../admin/teamMembers/TeamMembers';
import TeamMemberPositions from '../admin/teamMemberPositions/TeamMemberPositions';

let panes: any = undefined;



interface IProps {
	match: any;
	setActiveTab: (activeIndex: any) => void;
}

const ProfileContent: React.FC<IProps> = ({match, setActiveTab}) => {
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
				menuItem: 'Blog postimet',
				render: () => <Blogs />,
			},
			{
				menuItem: 'Antarët e ekipit',
				render: () => <TeamMembers />,
			},
			{
				menuItem: 'Mesazhet',
				render: () => <Messages />,
			},
			{
				menuItem: 'Qytetet',
				render: () => <Cities />,
			},
			{
				menuItem: 'Kategoritë e produktev',
				render: () => <ProductCategories />,
			},
			{
				menuItem: 'Kategoritë e shpalljev',
				render: () => <JobCategories />,
			},
			{
				menuItem: 'Kategoritë e blogjev',
				render: () => <BlogCategories />,
			},
			{
				menuItem: 'Pozitat e antarëve',
				render: () => <TeamMemberPositions />,
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
			{
				menuItem: 'Blog postimet',
				render: () => <ProfileBlogs />,
			},
			{
				menuItem: 'Followers',
				render: () => <ProfileFollowings />,
			},
			{
				menuItem: 'Following',
				render: () => <ProfileFollowings />,
			},
		];
	}

	return (
		<Tab
			menu={{ fluid: true, vertical: true }}
			menuPosition='right'
			panes={panes}
			onTabChange={(e, data) => setActiveTab(data.activeIndex)}
		/>
	);
};

export default observer(ProfileContent);
