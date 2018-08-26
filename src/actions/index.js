import axios from 'axios';
import { createAction } from 'redux-actions';

import routes from '../routes';

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = (channelId, values) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const data = { attributes: { ...values } };
    const response = await axios.post(routes.messagesUrl(channelId), { data });
    dispatch(addMessageSuccess({ message: response.data }));
  } catch (e) {
    dispatch(addMessageFailure());
  }
};

export const receiveMessageState = createAction('MESSAGE_STATE_RECEIVE');
