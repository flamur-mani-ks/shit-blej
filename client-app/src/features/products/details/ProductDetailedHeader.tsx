import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { IProduct } from '../../../app/models/product';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ProductDetailedHeader: React.FC<{ product: IProduct }> = ({
	product,
}) => {
	const owner = product.attendees.filter((x) => x.isOwner)[0];
	const rootStore = useContext(RootStoreContext);
	const {isLoggedIn, user} = rootStore.userStore;

	return (
		<Segment.Group>
			<Segment basic attached='top' style={{ padding: '0' }}>
				<Image src={`/assets/placeholder.png`} fluid />
				<Segment basic style={{ backgroundColor: 'white', margin: '0' }}>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header
									size='huge'
									content={product.title}
									style={{ color: 'black' }}
								/>
								<p>
									Postuar nga:{' '}
									<Link to={`/profile/${owner.username}`}>
										{owner.displayName}
									</Link>
								</p>
								{isLoggedIn && owner.username === user!.username && (
									<Button as={Link} to={`/manage/${product.id}`} color='orange'>
										Menagjo postimin
									</Button>
								)}
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>
		</Segment.Group>
	);
};

export default observer(ProductDetailedHeader);
