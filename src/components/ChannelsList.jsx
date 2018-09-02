import React from 'react';
import classNames from 'classnames';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  state = {
    removeChannelModal: false,
    removeChannelId: null,
  }

  handleClickChannel = (id) => {
    const { changeCurrentChannelId } = this.props;
    changeCurrentChannelId(id);
  }

  handleRemoveModalOpen = (id) => {
    this.setState({ removeChannelModal: true, removeChannelId: id });
  }

  handleRemoveModalClose = () => {
    this.setState({ removeChannelModal: false, removeChannelId: null });
  }

  handleRemoveChannel = (id) => {
    const { removeChannel } = this.props;
    removeChannel(id, this.handleRemoveModalClose);
  }

  renderChannel = (channel) => {
    const { currentChannelId } = this.props;
    const getClassChannel = id => classNames({
      'list-group-item': true,
      'channel-item': true,
      active: id === currentChannelId,
    });
    const getClassChannelBtn = id => classNames({
      btn: true,
      'btn-channel-item': true,
      'btn-primary': id === currentChannelId,
      'btn-link': id !== currentChannelId,
    });

    return (
      <li key={channel.id} className={getClassChannel(channel.id)}>
        <button
          type="button"
          className={getClassChannelBtn(channel.id)}
          onClick={() => this.handleClickChannel(channel.id)}
        >
          {channel.name}
        </button>
        {channel.removable && (
          <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group" role="group" aria-label="Third group">
              <button
                type="button"
                className="btn btn-link"
                onClick={() => this.handleRemoveModalOpen(channel.id)}
              >
                <FontAwesomeIcon icon="trash-alt" color="black" />
              </button>
            </div>
          </div>
        )}
      </li>
    );
  }

  render() {
    const { removeChannelModal, removeChannelId } = this.state;
    const { channels } = this.props;

    return (
      <React.Fragment>
        <div className="list-group w-100">
          {channels.map(channel => this.renderChannel(channel))}
        </div>
        <Modal isOpen={removeChannelModal} toggle={this.handleRemoveModalClose}>
          <ModalHeader toggle={this.handleRemoveModalClose}>
            Remove channel
          </ModalHeader>
          <ModalBody>
            Are you sure about this?
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => this.handleRemoveChannel(removeChannelId)}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.handleRemoveModalClose}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ChannelsList;
