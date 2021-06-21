import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IUserProduct } from '../../app/models/profile';
import { format } from 'date-fns';
import { RootStoreContext } from '../../app/stores/rootStore';


const ProfileEvents = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadUserProducts,
    profile,
    loadingProducts,
    userProducts
  } = rootStore.profileStore!;

  useEffect(() => {
    loadUserProducts(profile!.username);
  }, [loadUserProducts, profile]);

  return (
    <Tab.Pane loading={loadingProducts}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='calendar' content={'Produktet'} />
        </Grid.Column>
        <Grid.Column width={16}>
          
          <br />
          {userProducts.length > 0 ? (
          <Card.Group itemsPerRow={4}>
            {userProducts.map((product: IUserProduct) => (
              <Card
                as={Link}
                to={`/products/${product.id}`}
                key={product.id}
              >
                <Image
                  src={`/assets/placeholder.png`}
                  style={{ minHeight: 100, objectFit: 'cover' }}
                />
                <Card.Content>
                  <Card.Header textAlign='center'>{product.title}</Card.Header>
                  <Card.Meta textAlign='center'>
                    <div>{format(new Date(product.date), 'do LLL')}</div>
                    <div>{format(new Date(product.date), 'h:mm a')}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
          ): (
            <Header
							as='h2'
							textAlign='center'
							content={'Nuk ka asnjë produkt për të shfaqur'}
						></Header>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileEvents);
