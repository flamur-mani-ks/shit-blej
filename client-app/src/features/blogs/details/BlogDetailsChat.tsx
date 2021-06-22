import React, { Fragment, useContext, useEffect } from 'react';
import { Segment, Header, Form, Button, Comment } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import {Form as FinalForm, Field} from 'react-final-form';
import { Link } from 'react-router-dom';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import { observer } from 'mobx-react-lite';
import {formatDistance} from 'date-fns';

const BlogDetailsChat = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    createHubConnection,
    stopHubConnection,
    addComment,
    blog
  } = rootStore.blogStore;

  const { isLoggedIn, user } = rootStore.userStore;


  useEffect(() => {
    createHubConnection();
    return () => {
      stopHubConnection();
    }
  }, [createHubConnection, stopHubConnection])

  return (
    <Fragment>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{marginTop: '40px', border: 'none' }}
      >
        <Header>Shto një koment rreth këtij blogu</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {blog && blog.comments && blog.comments.map((comment) => (
          <Comment key={comment.id}>
          <Comment.Avatar src={comment.image || '/assets/user.png'} />
          <Comment.Content>
            <Comment.Author as={Link} to={`/profile/${comment.username}`}>{comment.displayName}</Comment.Author>
            <Comment.Metadata>
              <div>{formatDistance(comment.createdAt, new Date())}</div>
            </Comment.Metadata>
            <Comment.Text>{comment.body}</Comment.Text>
          </Comment.Content>
        </Comment>
          ))}

          {isLoggedIn && user ? (
          <FinalForm 
            onSubmit={addComment}
            render={({handleSubmit, submitting, form}) => (
              <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
              <Field 
                name='body'
                component={TextAreaInput}
                rows={2}
                placeholder='Komenti juaj...'
              />
              <Button
                loading={submitting}
                content='Shto komentin'
                labelPosition='left'
                icon='edit'
                primary
              />
            </Form>
            )}
          />
          ): (
            <Header
            as='h2'
            textAlign='center'
            content={'Për të shtuar koment duhet të jeni të regjistruar ne webfaqe'}
            color='teal'
          ></Header>
          )}
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};

export default observer(BlogDetailsChat);
