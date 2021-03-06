import React from 'react';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    
                    Shit-Blej
                </Header>
                <Header as='h2' inverted content='Mirë se vini' />
                <Button as={Link} to='/products' size='huge' inverted>
                    Më dërgo te produket
                </Button>
                <Button as={Link} to='/jobs' size='huge' inverted>
                    Më dërgo te vendet e punes
                </Button>
            </Container>
        </Segment>
  );
};

export default HomePage;
