import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IProduct } from '../../../app/models/product';
import { v4 as uuid } from 'uuid';
import ProductStore from '../../../app/stores/productStore';
import moment from 'moment';
import { observer } from 'mobx-react-lite';

interface IProps {
	product: IProduct;
}

const ProductForm: React.FC<IProps> = ({ product: initialFormState }) => {
	const productStore = useContext(ProductStore);
	const { createProduct, editProduct, submitting, cancelFormOpen } =
		productStore;

	const initializeForm = () => {
		if (initialFormState) {
			return initialFormState;
		} else {
			return {
				id: '',
				title: '',
				category: '',
				description: '',
				date: '',
				city: '',
				price: 0,
			};
		}
	};

	const [product, setProduct] = useState<IProduct>(initializeForm);

	const handleSubmit = () => {
		if (product.id.length === 0) {
			let newProduct = {
				...product,
				id: uuid(),
				date: moment().format('YYYY-MM-DD hh:mm:ss'),
			};
			createProduct(newProduct);
		} else {
			editProduct(product);
		}
	};

	const handleInputChange = (
		event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.currentTarget;
		setProduct({ ...product, [name]: value });
	};

	return (
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
					onClick={() => cancelFormOpen}
					floated='right'
					type='button'
					content='Cancel'
				/>
			</Form>
		</Segment>
	);
};

export default observer(ProductForm);
