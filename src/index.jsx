import React from 'react';
import ReactDOM from 'react-dom';

const App = ({ channels }) => (
  <div className="container">
    <div className="row" style={{ height: '90vh' }}>
      <div className="col-2 align-self-start">
        <div className="channels">
          <ul className="list-group">
            {channels.map(channel => <li key={channel.id} className="list-group-item">{channel.name}</li>)}
          </ul>
        </div>
      </div>
      <div className="col-10 align-self-end">
        <div className="messages">
          messages
        </div>
        <div className="message">
          <textarea className="form-control" rows="1" />
        </div>
      </div>
    </div>
  </div>
);

export default ({ channels }) => {
  ReactDOM.render(<App channels={channels} />, document.getElementById('chat'));
};
