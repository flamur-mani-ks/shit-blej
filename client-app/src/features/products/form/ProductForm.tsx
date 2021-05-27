import React, { useState, FormEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IProduct } from '../../../app/models/product';
import { v4 as uuid } from 'uuid';

interface IProps {
	setEditMode: (editMode: boolean) => void;
	product: IProduct;
	createProduct: (product: IProduct) => void;
	editProduct: (product: IProduct) => void;
	submitting: boolean;
}

const ProductForm: React.FC<IProps> = ({
	setEditMode,
	product: initialFormState,
	editProduct,
	createProduct,
	submitting
}) => {
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
				<Form.Input
					onChange={handleInputChange}
					name='date'
					type='datetime-local'
					placeholder='Date'
					value={product.date}
				/>
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
				<Button loading={submitting} floated='right' positive type='submit' content='Submit' />
				<Button
					onClick={() => setEditMode(false)}
					floated='right'
					type='button'
					content='Cancel'
				/>
			</Form>
		</Segment>
	);
};

export default ProductForm;
