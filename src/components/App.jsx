import React from 'react';
import NewMessageForm from './NewMessageForm';
import ChannelsListContainer from '../containers/ChannelsList';
import MessagesListContainer from '../containers/MessagesList';

const App = () => (
  <div className="container">
    <div className="row">
      <div className="col-2">
        <div className="channels">
          <ChannelsListContainer />
        </div>
      </div>
      <div className="col-10">
        <NewMessageForm />
        <MessagesListContainer />
      </div>
    </div>
  </div>
);

export default App;
