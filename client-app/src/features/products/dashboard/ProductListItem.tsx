import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label } from 'semantic-ui-react';
import { IProduct } from '../../../app/models/product';
import { format } from 'date-fns';
import ProductItemOwner from './ProductItemOwner';
import { observer } from 'mobx-react-lite';

const ProductListItem: React.FC<{ product: IProduct }> = ({ product }) => {

	return (
		<Item
			style={{
				padding: '10px',
				marginTop: '15px',
				marginBottom: '15px',
				backgroundColor: 'white',
			}}
		>
			<Item.Image size='medium' src='/assets/placeholder.png' />

			<Item.Content>
				<Item.Header as={Link} to={`/products/${product.id}`}>{product.title}</Item.Header>
				<Item.Meta>
					<span className='cinema'>{product.category}</span>
				</Item.Meta>
				<Item.Description>{product.description}</Item.Description>
				<Item.Extra>
					<Button
						as={Link}
						to={`/products/${product.id}`}
						floated='right'
						content='Shiqo'
						color='blue'
					/>
					<Label>{product.price} €</Label>
					<ProductItemOwner attendees={product.attendees} />
					<div>
						<Icon name='clock' /> {format(product.date, 'eeee do MMMM')} at{' '}
						{format(product.date, 'h:mm a')}
						<Icon name='marker' /> {product.city}
					</div>
				</Item.Extra>
			</Item.Content>
		</Item>
	);
};

export default observer(ProductListItem);
