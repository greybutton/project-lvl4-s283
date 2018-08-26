import React from 'react';
import NewMessageFormContainer from '../containers/NewMessageForm';
import ChannelsListContainer from '../containers/ChannelsList';
import MessagesListContainer from '../containers/MessagesList';

const App = (props) => {
  console.log('app', props);
  return (
    <div className="container">
      <div className="row" style={{ height: '90vh' }}>
        <div className="col-2 align-self-start">
          <div className="channels">
            <ChannelsListContainer />
          </div>
        </div>
        <div className="col-10 align-self-end">
          <MessagesListContainer />
          <NewMessageFormContainer />
        </div>
      </div>
    </div>
  );
};

export default App;
