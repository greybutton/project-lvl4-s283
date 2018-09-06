import React from 'react';
import connect from '../connect';
import { messagesSelector } from '../selectors';
import formatDate from '../date';

const mapStateToProps = (state) => {
  const props = {
    messages: messagesSelector(state),
  };
  return props;
};

@connect(mapStateToProps)
class MessagesList extends React.Component {
  render() {
    const { messages } = this.props;

    return (
      <React.Fragment>
        {messages.map(message => (
          <React.Fragment key={message.id}>
            <div>
              {message.username}
              {' '}
              {formatDate(message.createdAt)}
            </div>
            <p>
              {message.message}
            </p>
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

export default MessagesList;
