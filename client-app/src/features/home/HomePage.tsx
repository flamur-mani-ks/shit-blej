import React from 'react';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    
                    Shit-Blej
                </Header>
                <Header as='h2' inverted content='Mirë se vini' />
                <Button as={Link} to='/activities' size='huge' inverted>
                    Më dërgo te produket
                </Button>
            </Container>
        </Segment>
  );
};

export default HomePage;
