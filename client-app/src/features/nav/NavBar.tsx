import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import ProductStore from '../../app/stores/productStore';

const NavBar: React.FC = () => {
	const productStore = useContext(ProductStore);

	return (
		<Menu fixed='top' inverted>
			<Container>
				<Menu.Item header>
					<img src='/assets/logo.png' alt='logo' style={{ marginRight: 10 }} />
					Shit-Blej
				</Menu.Item>
				<Menu.Item name='Products' />
				<Menu.Item>
					<Button
						onClick={productStore.openCreateForm}
						positive
						content='Create Product'
					/>
				</Menu.Item>
			</Container>
		</Menu>
	);
};

export default observer(NavBar);
