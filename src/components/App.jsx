import React from 'react';
import NewMessageForm from './NewMessageForm';
import ChannelsList from './ChannelsList';
import MessagesList from './MessagesList';

const App = () => (
  <div className="container">
    <div className="row">
      <div className="col-2">
        <div className="channels">
          <ChannelsList />
        </div>
      </div>
      <div className="col-10">
        <NewMessageForm />
        <MessagesList />
      </div>
    </div>
  </div>
);

export default App;
