import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ProductDashboard from '../../features/products/dashboard/ProductDashboard';
import { observer } from 'mobx-react-lite';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ProductForm from '../../features/products/form/ProductForm';
import ProductDetails from '../../features/products/details/ProductDetails';

const App: React.FC<RouteComponentProps> = ({ location }) => {
	return (
		<Fragment>
			<Route exact path='/' component={HomePage} />
			<Route
				path={'/(.+)'}
				render={() => (
					<Fragment>
						<NavBar />
						<Container style={{ marginTop: '7em' }}>
							<Route exact path='/products' component={ProductDashboard} />
							<Route path='/products/:id' component={ProductDetails} />
							<Route
								key={location.key}
								path={['/createProduct', '/manage/:id']}
								component={ProductForm}
							/>
						</Container>
					</Fragment>
				)}
			/>
		</Fragment>
	);
};

export default withRouter(observer(App));
