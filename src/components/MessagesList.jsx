import React from 'react';
import formatDate from '../date';

const MessagesList = ({ messages }) => (
  <div className="messages">
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
  </div>
);

export default MessagesList;
