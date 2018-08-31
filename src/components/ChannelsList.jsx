import React from 'react';
import connect from '../connect';
import { channelsSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    channels: channelsSelector(state),
  };
  return props;
};

@connect(mapStateToProps)
class ChannelsList extends React.Component {
  render() {
    const { channels } = this.props;

    return (
      <ul className="list-group">
        {channels.map(channel => <li key={channel.id} className="list-group-item">{channel.name}</li>)}
      </ul>
    );
  }
}

export default ChannelsList;
