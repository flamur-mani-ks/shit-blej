import React from 'react';
import { Segment } from 'semantic-ui-react';
import ContactForm from './form/ContactForm';

const ContactUs = () => {
	return (
		<div>
			<Segment>
				<h1 style={{textAlign: 'center', fontSize: '50px'}} >Keni diçka të na tregoni ? <br /> <p style={{marginTop: '5px', fontSize: '20px'}}>Na lini një mesazh do t'iu kontaktojmë brenda ditës</p></h1>

        <ContactForm />
			</Segment>

			
		</div>
	);
};

export default ContactUs;
