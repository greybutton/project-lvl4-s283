import React from 'react';

const MessagesList = ({ messages }) => (
  <div className="messages">
    {messages.map(message => <p key={message.id}>{message.message}</p>)}
  </div>
);

export default MessagesList;
