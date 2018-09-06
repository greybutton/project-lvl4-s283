import React from 'react';

import NewChannelForm from './NewChannelForm';
import NewMessageForm from './NewMessageForm';
import ChannelsList from './ChannelsList';
import MessagesList from './MessagesList';

const App = () => (
  <div className="container">
    <div className="row">
      <div className="col-3">
        <div className="channels">
          <NewChannelForm />
          <ChannelsList />
        </div>
      </div>
      <div className="col-9">
        <NewMessageForm />
        <MessagesList />
      </div>
    </div>
  </div>
);

export default App;
