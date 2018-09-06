import axios from 'axios';
import { createAction } from 'redux-actions';

import routes from '../routes';

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = (channelId, values, reset) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const data = { attributes: { ...values } };
    const response = await axios.post(routes.messagesUrl(channelId), { data });
    dispatch(addMessageSuccess({ message: response.data }));
    reset();
  } catch (e) {
    dispatch(addMessageFailure());
  }
};

export const receiveMessage = createAction('MESSAGE_RECEIVE');
export const changeCurrentChannelId = createAction('CHANNEL_CHANGE_CURRENT_ID');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const addChannel = (values, reset) => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    const data = { attributes: { ...values } };
    await axios.post(routes.channelsUrl(), { data });
    dispatch(addChannelSuccess());
    reset();
  } catch (e) {
    dispatch(addChannelFailure());
  }
};

export const receiveChannel = createAction('CHANNEL_RECEIVE');
export const editChannel = createAction('CHANNEL_EDIT');
export const deleteChannel = createAction('CHANNEL_DELETE');

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const removeChannel = (id, closeModal) => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    await axios.delete(routes.channelUrl(id));
    closeModal();
  } catch (e) {
    dispatch(removeChannelFailure());
  }
};

export const updateChannelRequest = createAction('CHANNEL_UPDATE_REQUEST');
export const updateChannelSuccess = createAction('CHANNEL_UPDATE_SUCCESS');
export const updateChannelFailure = createAction('CHANNEL_UPDATE_FAILURE');

export const updateChannel = (channel, closeModal) => async (dispatch) => {
  dispatch(updateChannelRequest());
  try {
    const data = { attributes: channel };
    await axios.patch(routes.channelUrl(channel.id), { data });
    closeModal();
  } catch (e) {
    dispatch(updateChannelFailure());
  }
};
