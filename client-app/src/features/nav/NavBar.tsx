import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Container, Button, Image, Dropdown } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';

const NavBar: React.FC = () => {
	const rootStore = useContext(RootStoreContext);
	const { isLoggedIn, user, logout } = rootStore.userStore;
	const { openModal } = rootStore.modalStore;

	return (
		<Menu fixed='top' inverted>
			<Container>
				<Menu.Item header as={NavLink} exact to='/'>
					<img src='/assets/logo.png' alt='logo' style={{ marginRight: 10 }} />
					Shit-Blej
				</Menu.Item>
				<Menu.Item name='Produktet' as={NavLink} to='/products' />
				<Menu.Item name='Shpalljet' as={NavLink} to='/jobs' />
				
				{isLoggedIn && user ? (
					<Fragment>
						<Menu.Item>
							<Button
							style={{marginRight: '20px'}}
								as={NavLink}
								to='/createProduct'
								positive
								content='Shto Produkt'
							/>
							<Button
							
							as={NavLink}
							to='/createJob'
							
							
							color='teal'
							content='Shto Shpallje'
						/>
							
						</Menu.Item>
						<Menu.Item position='right'>
							<Image
								avatar
								spaced='right'
								src={user.image || '/assets/user.png'}
							/>
							<Dropdown pointing='top left' text={user.displayName}>
								<Dropdown.Menu>
									<Dropdown.Item
										as={Link}
										to={`/profile/${user.username}`}
										text='Profili im'
										icon='user'
									/>
									<Dropdown.Item onClick={logout} text='Logout' icon='power' />
								</Dropdown.Menu>
							</Dropdown>
						</Menu.Item>
					</Fragment>
				) : (
					<Fragment>
						{/* <Menu.Item name='Shpalljet' as={NavLink} to='/jobs' /> */}
						<Menu.Item position='right'>
							<Button
								style={{ marginRight: '10px' }}
								onClick={() => openModal(<RegisterForm />)}
								to='/register'
								color='teal'
								content='Regjistrohu'
							/>
							<Button
								onClick={() => openModal(<LoginForm />)}
								to='/login'
								color='teal'
								content='Login'
							/>
						</Menu.Item>
					</Fragment>
				)}
			</Container>
		</Menu>
	);
};

export default observer(NavBar);
