import { observer } from 'mobx-react-lite';
import React from 'react';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { IProduct } from '../../../app/models/product';

const ProductDetailedHeader: React.FC<{product: IProduct}> = ({product}) => {
	return (
		<Segment.Group>
			<Segment basic attached='top' style={{ padding: '0'}}>
				<Image src={`/assets/placeholder.png`} fluid />
				<Segment basic style={{backgroundColor: 'white', margin: '0'}}>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header
									size='huge'
									content={product.title}
									style={{ color: 'black' }}
								/>
								<p>
									Posted by <strong>Bob</strong>
								</p>
								<Button color='orange'>
									Manage Product
								</Button>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>
		</Segment.Group>
	);
};

export default observer(ProductDetailedHeader);
