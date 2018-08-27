import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { getCookies } from '../cookies';

class NewMessageForm extends React.Component {
  state = {
    text: 'jopa',
  }

  componentDidUpdate() {
    const { text } = this.state;
    const { messageCreatingState, change } = this.props;
    const failed = messageCreatingState === 'failed';
    if (failed) {
      change('message', text);
    }
  }

  addMessage = (values) => {
    const { addMessage, currentChannelId, reset } = this.props;
    const username = getCookies('username');
    const createdAt = new Date();
    const value = {
      ...values,
      username,
      createdAt,
    };
    addMessage(currentChannelId, value);
    reset();
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ text: value });
  };

  render() {
    const { messageCreatingState, handleSubmit } = this.props;
    const disabled = messageCreatingState === 'requested';
    const failed = messageCreatingState === 'failed';

    return (
      <form onSubmit={handleSubmit(this.addMessage)}>
        <div className="message">
          <Field
            required
            name="message"
            component="input"
            className="form-control"
            disabled={disabled}
            onChange={this.handleChange}
          />
        </div>
        {disabled && <div>Sending</div>}
        {failed && <div>Error. Try again.</div>}
      </form>
    );
  }
}

export default reduxForm({
  form: 'newMessage',
})(NewMessageForm);
