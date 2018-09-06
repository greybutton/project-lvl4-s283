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
  const { result: { currentChannelId }, editChannelState, deleteChannelState } = state;
  const props = {
    channels: channelsSelector(state),
    currentChannelId,
    editChannelState,
    deleteChannelState,
  };
  return props;
};

@connect(mapStateToProps)
@reduxForm({ form: 'updateChannel' })
class ChannelsList extends React.Component {
  handleClickChannel = (id) => {
    const { changeCurrentChannelId } = this.props;
    changeCurrentChannelId(id);
  }

  handleEditModalOpen = (e, channel) => {
    e.stopPropagation();
    const { editChannel } = this.props;
    editChannel({ modal: true, channel });
  }

  handleEditModalClose = () => {
    const { editChannel, reset } = this.props;
    editChannel({ modal: false, channel: null });
    reset();
  }

  handleEditChannel = (values) => {
    const { updateChannel, editChannelState: { channel } } = this.props;
    const newChannel = {
      ...channel,
      ...values,
    };
    updateChannel(newChannel, this.handleEditModalClose);
  }

  handleRemoveModalOpen = (e, id) => {
    e.stopPropagation();
    const { deleteChannel } = this.props;
    deleteChannel({ modal: true, id });
  }

  handleRemoveModalClose = () => {
    const { deleteChannel } = this.props;
    deleteChannel({ modal: false, id: null });
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

  renderEditChannelModal = () => {
    const { handleSubmit, editChannelState } = this.props;
    return (
      <Modal isOpen={editChannelState.modal} toggle={this.handleEditModalClose}>
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
    );
  }


  renderRemoveChannelModal = () => {
    const { deleteChannelState } = this.props;
    return (
      <Modal isOpen={deleteChannelState.modal} toggle={this.handleRemoveModalClose}>
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
            onClick={() => this.handleRemoveChannel(deleteChannelState.id)}
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
    );
  }

  render() {
    const { channels } = this.props;

    return (
      <React.Fragment>
        <div className="list-group w-100">
          {channels.map(channel => this.renderChannel(channel))}
        </div>
        {this.renderEditChannelModal()}
        {this.renderRemoveChannelModal()}
      </React.Fragment>
    );
  }
}

export default ChannelsList;
