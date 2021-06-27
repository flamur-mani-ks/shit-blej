import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IProductCategory } from '../../../app/models/productCategory';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface IProps {
	productCategory: IProductCategory;
}

const ProductCategoryForm: React.FC<IProps> = ({ productCategory: initialFormState }) => {
	const rootStore = useContext(RootStoreContext);
	const { createProductCategory, editProductCategory, submitting, cancelFormOpen } =
		rootStore.productCategoryStore;
	const initializeForm = () => {
		if (initialFormState) {
			return initialFormState;
		} else {
			return {
				id: '',
				category: ''
			};
		}
	};

	const [productCategory, setProductCategory] = useState<IProductCategory>(initializeForm);

	const handleSubmit = () => {
		if (productCategory.id.length === 0) {
			let newProductCategory = {
				...productCategory,
				id: uuid(),
			};
			createProductCategory(newProductCategory);
		} else {
			editProductCategory(productCategory);
		}
	};

	const handleInputChange = (
		event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.currentTarget;
		setProductCategory({ ...productCategory, [name]: value });
	};

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit}>
				<Form.Input
					onChange={handleInputChange}
					name='category'
					placeholder='Kategoria'
					value={productCategory.category}
				/>
				
				<Button
					loading={submitting}
					floated='right'
					positive
					type='submit'
					content='Submit'
				/>
				<Button
					onClick={cancelFormOpen}
					floated='right'
					type='button'
					content='Cancel'
				/>
			</Form>
		</Segment>
	);
};

export default observer(ProductCategoryForm);
