import React from 'react';
import { Segment, Item } from 'semantic-ui-react';

const ProductDetailedSidebar = () => {
	return (
		<Segment.Group>
      <Segment>
				<Item.Group>
					<Item>
						<Item.Image size='tiny' circular src='/assets/user.png' />
					</Item>
				</Item.Group>
        <div>
          {'Emri i autorit'}
        </div>
        <div>
          {'Numri i telefonit'}
        </div>
        </Segment>
			
		</Segment.Group>
	);
};

export default ProductDetailedSidebar;
