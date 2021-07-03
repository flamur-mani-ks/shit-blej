import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Tab, Grid, Header, Card } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import ProfileCard from './ProfileCard';

const ProfileFollowings = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    followings,
    loading,
    activeTab
  } = rootStore.profileStore;

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='users'
            content={
              activeTab === 5
                ? `Përdoruesit following ${profile!.displayName}`
                : `Përdoruesit ${profile!.displayName} is following`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          {followings.length > 0 ? (
          <Card.Group itemsPerRow={5}>
            {followings.map(profile => (
              <ProfileCard key={profile.username} profile={profile} />
            ))}
          </Card.Group>
          ): (
            <Header
							as='h2'
							textAlign='center'
							content={'Nuk ka asnjë përdorues për të shfaqur'}
						></Header>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileFollowings);
