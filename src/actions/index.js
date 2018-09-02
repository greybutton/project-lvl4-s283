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

export const receiveMessageState = createAction('MESSAGE_STATE_RECEIVE');
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

export const receiveChannelState = createAction('CHANNEL_STATE_RECEIVE');
