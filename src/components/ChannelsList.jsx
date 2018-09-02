import React from 'react';
import classNames from 'classnames';
import connect from '../connect';
import { channelsSelector } from '../selectors';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  const props = {
    channels: channelsSelector(state),
    currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
class ChannelsList extends React.Component {
  handleClickChannel = (id) => {
    const { changeCurrentChannelId } = this.props;
    changeCurrentChannelId(id);
  }

  renderChannel = (channel) => {
    const { currentChannelId } = this.props;
    const getClassChannel = id => classNames({
      btn: true,
      'btn-primary': id === currentChannelId,
      'btn-light': id !== currentChannelId,
    });

    return (
      <button
        type="button"
        key={channel.id}
        className={getClassChannel(channel.id)}
        onClick={() => this.handleClickChannel(channel.id)}
      >
        {channel.name}
      </button>
    );
  }

  render() {
    const { channels } = this.props;

    return (
      <div className="btn-group-vertical w-100">
        {channels.map(channel => this.renderChannel(channel))}
      </div>
    );
  }
}

export default ChannelsList;
