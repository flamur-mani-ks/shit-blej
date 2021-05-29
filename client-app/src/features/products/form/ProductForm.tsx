import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { IProduct } from '../../../app/models/product';
import { v4 as uuid } from 'uuid';
import ProductStore from '../../../app/stores/productStore';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';

interface DetailParams {
	id: string;
}

const ProductForm: React.FC<RouteComponentProps<DetailParams>> = ({
	match,
	history,
}) => {
	const productStore = useContext(ProductStore);
	const {
		createProduct,
		editProduct,
		submitting,
		product: initialFormState,
		loadProduct,
		clearProduct,
	} = productStore;

	const [product, setProduct] = useState<IProduct>({
		id: '',
		title: '',
		category: '',
		description: '',
		date: '',
		city: '',
		price: 0,
	});

	useEffect(() => {
		if (match.params.id && product.id.length === 0) {
			loadProduct(match.params.id).then(
				() => initialFormState && setProduct(initialFormState)
			);
		}
		return () => {
			clearProduct();
		};
	}, [
		loadProduct,
		clearProduct,
		match.params.id,
		initialFormState,
		product.id.length,
	]);

	const handleSubmit = () => {
		if (product.id.length === 0) {
			let newProduct = {
				...product,
				id: uuid(),
				date: moment().format('YYYY-MM-DD hh:mm:ss'),
			};
			createProduct(newProduct).then(() =>
				history.push(`/products/${newProduct.id}`)
			);
		} else {
			editProduct(product).then(() => history.push(`/products/${product.id}`));
		}
	};

	const handleInputChange = (
		event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.currentTarget;
		setProduct({ ...product, [name]: value });
	};

	return (
		<Grid>
			<Grid.Column width={10}>
				<Segment clearing>
					<Form onSubmit={handleSubmit}>
						<Form.Input
							onChange={handleInputChange}
							name='title'
							placeholder='Title'
							value={product.title}
						/>
						<Form.TextArea
							onChange={handleInputChange}
							name='description'
							rows={2}
							placeholder='Description'
							value={product.description}
						/>
						<Form.Input
							onChange={handleInputChange}
							name='category'
							placeholder='Category'
							value={product.category}
						/>
						{/* <Form.Input
		onChange={handleInputChange}
		name='date'
		type='datetime-local'
		placeholder='Date'
		value={product.date}
	/> */}
						<Form.Input
							onChange={handleInputChange}
							name='city'
							placeholder='City'
							value={product.city}
						/>
						<Form.Input
							onChange={handleInputChange}
							type='number'
							name='price'
							placeholder='Price'
							value={product.price}
						/>
						<Button
							loading={submitting}
							floated='right'
							positive
							type='submit'
							content='Submit'
						/>
						<Button
							onClick={() => history.push('/products')}
							floated='right'
							type='button'
							content='Cancel'
						/>
					</Form>
				</Segment>
			</Grid.Column>
		</Grid>
	);
};

export default observer(ProductForm);
