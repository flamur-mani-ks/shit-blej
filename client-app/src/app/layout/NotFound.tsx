import React from 'react';
import { Segment, Button, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Na vjen keq, informacioni që kërkuat nuk ekziston
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/products' primary>
                    Kthehu te faqja produktev
                </Button>
            </Segment.Inline>
        </Segment>
    );
};

export default NotFound;