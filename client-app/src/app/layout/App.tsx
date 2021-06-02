import React, { Fragment, useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ProductDashboard from '../../features/products/dashboard/ProductDashboard';
import { observer } from 'mobx-react-lite';
import {
	Route,
	RouteComponentProps,
	Switch,
	withRouter,
} from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ProductForm from '../../features/products/form/ProductForm';
import ProductDetails from '../../features/products/details/ProductDetails';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';
import { RootStoreContext } from '../stores/rootStore';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import SearchComponent from '../../features/search/SearchComponent';

const App: React.FC<RouteComponentProps> = ({ location }) => {
	const rootStore = useContext(RootStoreContext);
	const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
	const { getUser } = rootStore.userStore;

	useEffect(() => {
		if (token) {
			getUser().finally(() => setAppLoaded());
		} else {
			setAppLoaded();
		}
	}, [getUser, setAppLoaded, token]);

	if (!appLoaded) return <LoadingComponent content='Loading app...' />;

	return (
		<Fragment>
			<ModalContainer />
			<ToastContainer position='bottom-right' />
			<Route exact path='/' component={HomePage} />
			<Route
				path={'/(.+)'}
				render={() => (
					<Fragment>
						<NavBar />

						<Container style={{ marginTop: '7em' }}>
							
							<Switch>
								<Route exact path='/products' component={ProductDashboard} />
								<Route path='/products/:id' component={ProductDetails} />
								<Route
									key={location.key}
									path={['/createProduct', '/manage/:id']}
									component={ProductForm}
								/>
								<Route path='/profile/:username' component={ProfilePage} />
								<Route component={NotFound} />
							</Switch>
						</Container>
					</Fragment>
				)}
			/>
		</Fragment>
	);
};

export default withRouter(observer(App));
