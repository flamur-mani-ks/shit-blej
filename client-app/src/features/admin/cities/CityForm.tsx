import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { ICity } from '../../../app/models/city';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface IProps {
	city: ICity;
}

const CityForm: React.FC<IProps> = ({ city: initialFormState }) => {
	const rootStore = useContext(RootStoreContext);
	const { createCity, editCity, submitting, cancelFormOpen } =
		rootStore.cityStore;
	const initializeForm = () => {
		if (initialFormState) {
			return initialFormState;
		} else {
			return {
				id: '',
				cityName: ''
			};
		}
	};

	const [city, setCity] = useState<ICity>(initializeForm);

	const handleSubmit = () => {
		if (city.id.length === 0) {
			let newCity = {
				...city,
				id: uuid(),
			};
			createCity(newCity);
		} else {
			editCity(city);
		}
	};

	const handleInputChange = (
		event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.currentTarget;
		setCity({ ...city, [name]: value });
	};

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit}>
				<Form.Input
					onChange={handleInputChange}
					name='cityName'
					placeholder='Emri qytetit'
					value={city.cityName}
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

export default observer(CityForm);
