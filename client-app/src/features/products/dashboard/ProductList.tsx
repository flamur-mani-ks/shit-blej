// @ts-nocheck
import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext, useState } from 'react';
import {Input, Item, Select } from 'semantic-ui-react';
import { category } from '../../../app/common/options/categoryOptions';
import { city } from '../../../app/common/options/cityOptions';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ProductListItem from './ProductListItem';

const ProductList: React.FC = () => {
	const rootStore = useContext(RootStoreContext);
	const { productsByDate } = rootStore.productStore;

	const [searchTerm, setSearchTerm] = useState('');
	const [categoryTerm, setCategoryTerm] = useState('');
	const [cityTerm, setCityTerm] = useState('');

	return (
		<Fragment>
			<div style={{display: 'flex' as 'flex', justifyContent: 'space-between'}}>
			<Input
				type='text'
				placeholder='Search...'
				icon='search'
				onChange={(event) => {
					setSearchTerm(event.target.value);
				}}
			/>
			<Select
				options={category}
				placeholder='Kateogria...'
				onChange={(event) => {
					/*
					// @ts-ignore */
					setCategoryTerm(event.target);
				}}
			/>
			<Select
				options={city}
				placeholder='Qyteti...'
				onChange={(event) => {
					/*
					// @ts-ignore */
					setCityTerm(event.target);
				}}
				/>
				</div>

			<Item.Group divided style={{ marginTop: '15px', marginBottom: '15px' }}>
				{productsByDate
					.filter((product) => {
						
						const title = product.title.toLowerCase();
						const category = product.category.toLowerCase();
						const city = product.city.toLowerCase();

							/*
							// @ts-ignore */
							if(searchTerm === '' && categoryTerm.textContent === undefined && cityTerm.textContent === undefined){
								return product;
							}
							//==========================================================================
						
							//TEXT
							/*
							// @ts-ignore */
						if(searchTerm !== '' && categoryTerm.textContent === undefined && cityTerm.textContent === undefined){
						 if(title.includes(searchTerm.toLowerCase())) {
							return product;
						}
					}

						
							//TEXT dhe Kategori
							/*
							// @ts-ignore */
							if(searchTerm !== '' && categoryTerm.textContent !== undefined && cityTerm.textContent === undefined){
							/*
							// @ts-ignore */
							if(title.includes(searchTerm.toLowerCase()) && category.includes(categoryTerm.textContent.toLowerCase())) {
								return product;
							}	
						}

							
							//Text dhe Kategori dhe Qytet
							/*
							// @ts-ignore */
						if(searchTerm !== '' && categoryTerm.textContent !== undefined && cityTerm.textContent !== undefined ){
							/*
							// @ts-ignore */
							if(title.includes(searchTerm.toLowerCase()) &&  category.includes(categoryTerm.textContent.toLowerCase()) && city.includes(cityTerm.textContent.toLowerCase()) ) {
								return product;
							}	
						}
							
							//Kategori
							/*
							// @ts-ignore */
							if(searchTerm === '' && categoryTerm.textContent !== undefined && cityTerm.textContent === undefined ){
								/*
								// @ts-ignore */
								if(category.includes(categoryTerm.textContent.toLowerCase())) {
									return product;
								}	
							}
							
							/*
      				// @ts-ignore */
							//Qytet
							if(searchTerm === '' && categoryTerm.textContent === undefined && cityTerm.textContent !== undefined ){
								/*
								// @ts-ignore */
								if(city.includes(cityTerm.textContent.toLowerCase())) {
									return product;
								}	
							}
							
								/*
      				// @ts-ignore */
							//Tekst dhe Kategori
						if(searchTerm !== '' && categoryTerm.textContent !== undefined && cityTerm.textContent === undefined){
							/*
      				// @ts-ignore */
						 if(title.includes(searchTerm.toLowerCase()) && category.includes(categoryTerm.textContent.toLowerCase())) {
							return product;
						}
					}

						/*
      				// @ts-ignore */
							//Tekst dhe Qytet
							if(searchTerm !== '' && categoryTerm.textContent === undefined && cityTerm.textContent !== undefined){
								/*
								// @ts-ignore */
							 if(title.includes(searchTerm.toLowerCase()) && city.includes(cityTerm.textContent.toLowerCase())) {
								return product;
							}
						}
							
						/*
      				// @ts-ignore */
							//Kategori dhe Qytet
							if(searchTerm === '' && categoryTerm.textContent !== undefined && cityTerm.textContent !== undefined){
								/*
								// @ts-ignore */
							 if(category.includes(categoryTerm.textContent.toLowerCase()) && city.includes(cityTerm.textContent.toLowerCase())) {
								return product;
							}
						}

						//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
						
						/*
      				// @ts-ignore */
							//TEXT gjith kategorit gjith kosova
							if(searchTerm !== '' && categoryTerm.textContent === 'Të gjitha kategoritë' && cityTerm.textContent === 'Gjith Kosova'){
								/*
								// @ts-ignore */
							 if(title.includes(searchTerm.toLowerCase())) {
								return product;
							}
						}

							/*
      				// @ts-ignore */
							//TEXT gjitha kategorit
							if(searchTerm !== '' && categoryTerm.textContent === 'Të gjitha kategoritë' && cityTerm.textContent === undefined){
								/*
								// @ts-ignore */
							 if(title.includes(searchTerm.toLowerCase())) {
								return product;
							}
						}

						/*
      				// @ts-ignore */
							//TEXT gjitha kategorit dhe qyteti
							if(searchTerm !== '' && categoryTerm.textContent === 'Të gjitha kategoritë' && cityTerm.textContent !== undefined){
								/*
								// @ts-ignore */
							 if(title.includes(searchTerm.toLowerCase())  && city.includes(cityTerm.textContent.toLowerCase())) {
								return product;
							}
						}

						/*
      				// @ts-ignore */
							//TEXT kategorit dhe gjith kosova
							if(searchTerm !== '' && categoryTerm.textContent !== undefined && cityTerm.textContent === 'Gjith Kosova'){
								/*
								// @ts-ignore */
							 if(title.includes(searchTerm.toLowerCase())  && category.includes(categoryTerm.textContent.toLowerCase())) {
								return product;
							}
						}
						
							/*
      				// @ts-ignore */
							if(searchTerm === ''){
								/*
      				// @ts-ignore */
								if(categoryTerm.textContent === 'Të gjitha kategoritë'){
									/*
      						// @ts-ignore */
									if(cityTerm.textContent === 'Gjith Kosova'){
										/*
										// @ts-ignore */
										return product;
									}
										/*
										// @ts-ignore */
									if(cityTerm.textContent !== undefined){
										/*
										// @ts-ignore */
										if(city.includes(cityTerm.textContent.toLowerCase())){
											return product;
										}
									}else{
										return product;
									}
								}else{
									/*
										// @ts-ignore */
									if(cityTerm.textContent === 'Gjith Kosova'){
										/*
										// @ts-ignore */
										if(categoryTerm.textContent !== undefined){
											/*
										// @ts-ignore */
											if(category.includes(categoryTerm.textContent.toLowerCase())){
												return product;
											}
										}
									}
								}
							}	
							return null;
					})
					
					.map((product) => (
						<ProductListItem key={product.id} product={product} />
					))}
			</Item.Group>
		</Fragment>
	);
};

export default observer(ProductList);
