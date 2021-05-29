import React from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	Icon,
	Item,
	Label,
} from 'semantic-ui-react';
import { IProduct } from '../../../app/models/product';

const ProductListItem: React.FC<{ product: IProduct }> = ({ product }) => {
	return (
		// <Item key={product.id}>
		// 	<Item.Content>
		// 		<Item.Header as='a'>{product.title}</Item.Header>
		// 		<Item.Meta>{product.date}</Item.Meta>
		// 		<Item.Description>
		// 			<div>{product.description}</div>
		// 			<div>
		// 				{product.city}, {product.price}
		// 			</div>
		// 		</Item.Description>
		// 		<Item.Extra>
		// <Button
		// 	as={Link}
		// 	to={`/products/${product.id}`}
		// 	floated='right'
		// 	content='View'
		// 	color='blue'
		// />
		// 			<Label basic content={product.category} />
		// 		</Item.Extra>
		// 	</Item.Content>
		// </Item>

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
				<Item.Header as='a'>{product.title}</Item.Header>
				<Item.Meta>
					<span className='cinema'>{product.category}</span>
				</Item.Meta>
				<Item.Description>{product.description}</Item.Description>
				<Item.Extra>
					<Button
						as={Link}
						to={`/products/${product.id}`}
						floated='right'
						content='View'
						color='blue'
					/>
					<Label>{product.price} €</Label>

					<div>
						<Icon name='clock' /> {product.date}
						<Icon name='marker' /> {product.city}
					</div>
				</Item.Extra>
			</Item.Content>
		</Item>
	);
};

export default ProductListItem;
