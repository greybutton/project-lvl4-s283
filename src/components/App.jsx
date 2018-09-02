import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import NewChannelForm from './NewChannelForm';
import NewMessageForm from './NewMessageForm';
import ChannelsList from './ChannelsList';
import MessagesList from './MessagesList';

library.add(faTrashAlt);
library.add(faEdit);

const App = () => (
  <div className="container">
    <div className="row">
      <div className="col-2">
        <div className="channels">
          <NewChannelForm />
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
