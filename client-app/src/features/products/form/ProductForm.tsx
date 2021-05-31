import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';
import { city } from '../../../app/common/options/cityOptions';
import { ProductFormValues } from '../../../app/models/product';
import {
	combineValidators,
	isRequired,
	composeValidators,
	hasLengthGreaterThan,
} from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';

const validate = combineValidators({
	title: isRequired({ message: 'Titulli i produktit është i detyrueshëm' }),
	category: isRequired({
		message: 'Kategoria e produktit është e detyrueshme',
	}),
	description: composeValidators(
		isRequired({ message: 'Përshkrimi i produktit është i detyrueshëm' }),
		hasLengthGreaterThan(4)({
			message: 'Përshkrimi duhet të jet së paku 5 karaktere i gjat',
		})
	)(),
	city: isRequired({ message: 'Qyteti i produktit është i detyrueshëm' }),
	price: isRequired({ message: 'Çmimi i produktit është i detyrueshëm' }),
});

interface DetailParams {
	id: string;
}

const ProductForm: React.FC<RouteComponentProps<DetailParams>> = ({
	match,
	history,
}) => {
	const rootStore = useContext(RootStoreContext);
	const { createProduct, editProduct, submitting, loadProduct, deleteProduct } =
		rootStore.productStore;

	const [product, setProduct] = useState(new ProductFormValues());
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (match.params.id) {
			setLoading(true);
			loadProduct(match.params.id)
				.then((product) => {
					setProduct(new ProductFormValues(product));
				})
				.finally(() => setLoading(false));
		}
	}, [loadProduct, match.params.id]);

	const handleFinalFormSubmit = (values: any) => {
		// const dateAndTime = combineDateAndTime(values.date, values.time);
		const { date, time, ...product } = values;
		// product.date = dateAndTime;
		if (!product.id) {
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

	return (
		<Grid>
			<Grid.Column width={10}>
				<Segment clearing>
					<FinalForm
						validate={validate}
						initialValues={product}
						onSubmit={handleFinalFormSubmit}
						render={({ handleSubmit, invalid, pristine }) => (
							<Form onSubmit={handleSubmit} loading={loading}>
								<Field
									name='title'
									placeholder='Title'
									value={product.title}
									component={TextInput}
								/>
								<Field
									name='description'
									placeholder='Description'
									rows={3}
									value={product.description}
									component={TextAreaInput}
								/>
								<Field
									name='category'
									placeholder='Category'
									value={product.category}
									component={SelectInput}
									options={category}
								/>
								{/* <Form.Group widths='equal'>
                  <Field
                    component={DateInput}
                    name='date'
                    date={true}
                    placeholder='Date'
                    value={product.date}
                  />
                  <Field
                    component={DateInput}
                    name='time'
                    time={true}
                    placeholder='Time'
                    value={product.time}
                  />
                </Form.Group> */}
								<Field
									name='city'
									placeholder='City'
									value={product.city}
									component={SelectInput}
									options={city}
								/>

								<Field
									type='number'
									name='price'
									placeholder='Price'
									/*
      						// @ts-ignore */
									value={product.price}
									/*
      						// @ts-ignore */
									component={TextInput}
								/>
								<Button
									loading={submitting}
									floated='right'
									positive
									type='submit'
									content='Submit'
									disabled={loading || invalid || pristine}
								/>
								<Button
									onClick={
										product.id
											? () => history.push(`/products/${product.id}`)
											: () => history.push('/products')
									}
									floated='right'
									type='button'
									content='Cancel'
									disabled={loading}
								/>
								{product.id && (
									<Button
									onClick={(e) => {deleteProduct(e, product.id!); history.push('/products');} }
										loading={submitting}
										floated='right'
										negative
										type='submit'
										content='Delete'
										disabled={loading}
									/>
								)}
							</Form>
						)}
					/>
				</Segment>
			</Grid.Column>
		</Grid>
	);
};

export default observer(ProductForm);
