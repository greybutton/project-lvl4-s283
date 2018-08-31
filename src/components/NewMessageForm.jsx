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
  addMessage = async (values) => {
    const {
      addMessage, currentChannelId,
    } = this.props;
    const username = getCookies('username');
    const createdAt = new Date();
    const value = {
      ...values,
      username,
      createdAt,
    };
    await addMessage(currentChannelId, value);
  }

  render() {
    const {
      messageCreatingState, handleSubmit, submitting,
    } = this.props;
    const failed = messageCreatingState === 'failed';

    return (
      <form onSubmit={handleSubmit(this.addMessage)}>
        <div className="message">
          <Field
            required
            name="message"
            component="input"
            className="form-control"
            disabled={submitting}
            onChange={this.handleChange}
          />
        </div>
        {submitting && <div>Sending</div>}
        {failed && <div>Error. Try again.</div>}
      </form>
    );
  }
}

export default NewMessageForm;
