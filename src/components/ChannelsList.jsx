import React from 'react';
import { Field, reduxForm } from 'redux-form';
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
@reduxForm({ form: 'updateChannel' })
class ChannelsList extends React.Component {
  state = {
    removeChannelModal: false,
    removeChannelId: null,
    editChannelModal: false,
    editChannel: null,
  }

  handleClickChannel = (id) => {
    const { changeCurrentChannelId } = this.props;
    changeCurrentChannelId(id);
  }

  handleEditModalOpen = (e, channel) => {
    e.stopPropagation();
    this.setState({ editChannelModal: true, editChannel: channel });
  }

  handleEditModalClose = () => {
    const { reset } = this.props;
    this.setState({ editChannelModal: false, editChannel: null });
    reset();
  }

  handleEditChannel = (values) => {
    const { editChannel } = this.state;
    const { updateChannel } = this.props;
    const newChannel = {
      ...editChannel,
      ...values,
    };
    updateChannel(newChannel, this.handleEditModalClose);
  }

  handleRemoveModalOpen = (e, id) => {
    e.stopPropagation();
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
      'list-group-item p-0': true,
      active: id === currentChannelId,
    });
    const getClassChannelBtn = id => classNames({
      'btn w-100 d-flex justify-content-between align-items-center rounded-0': true,
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
          {channel.removable && (
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
              <div className="btn-group" role="group" aria-label="Third group">
                <button
                  type="button"
                  className="btn btn-link border-0 pt-0 pb-0"
                  onClick={e => this.handleEditModalOpen(e, channel)}
                >
                  <FontAwesomeIcon icon="edit" color="black" />
                </button>
                <button
                  type="button"
                  className="btn btn-link border-0 pt-0 pb-0 pr-0"
                  onClick={e => this.handleRemoveModalOpen(e, channel.id)}
                >
                  <FontAwesomeIcon icon="trash-alt" color="black" />
                </button>
              </div>
            </div>
          )}
        </button>
      </li>
    );
  }

  render() {
    const {
      removeChannelModal, editChannelModal, removeChannelId, editChannel,
    } = this.state;
    const {
      channels, handleSubmit,
    } = this.props;

    return (
      <React.Fragment>
        <div className="list-group w-100">
          {channels.allIds.map(id => this.renderChannel(channels.byId[id]))}
        </div>
        {editChannelModal && (
          <Modal isOpen={editChannelModal} toggle={this.handleEditModalClose}>
            <ModalHeader toggle={this.handleEditModalClose}>
            Edit channel
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(this.handleEditChannel)}>
                <Field
                  required
                  name="name"
                  component="input"
                  className="form-control"
                  value={editChannel.name}
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit(this.handleEditChannel)}
              >
              Update
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.handleEditModalClose}
              >
              Cancel
              </button>
            </ModalFooter>
          </Modal>
        )}
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
