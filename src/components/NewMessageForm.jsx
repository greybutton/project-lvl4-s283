import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';
import { getCookies } from '../cookies';

const mapStateToProps = ({ messageCreatingState, currentChannelId }) => {
  const props = {
    messageCreatingState,
    currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
@reduxForm({ form: 'newMessage' })
class NewMessageForm extends React.Component {
  addMessage = (values) => {
    const {
      addMessage, currentChannelId, reset,
    } = this.props;
    const username = getCookies('username');
    const createdAt = new Date();
    const value = {
      ...values,
      username,
      createdAt,
    };
    addMessage(currentChannelId, value, reset);
  }

  render() {
    const {
      messageCreatingState, handleSubmit, submitting,
    } = this.props;
    const failed = messageCreatingState === 'failed';

    return (
      <form className="mb-3" onSubmit={handleSubmit(this.addMessage)}>
        <Field
          required
          name="message"
          component="input"
          className="form-control"
          disabled={submitting}
          autoFocus
        />
        {submitting && <div>Sending</div>}
        {failed && <div>Error. Try again.</div>}
      </form>
    );
  }
}

export default NewMessageForm;
