import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channelCreatingState = handleActions({
  [actions.addChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelFailure]() {
    return 'failed';
  },
  [actions.addChannelSuccess]() {
    return 'successed';
  },
}, 'none');

const messageCreatingState = handleActions({
  [actions.addMessageRequest]() {
    return 'requested';
  },
  [actions.addMessageFailure]() {
    return 'failed';
  },
  [actions.addMessageSuccess]() {
    return 'successed';
  },
}, 'none');

const channels = handleActions({
  [actions.receiveChannelState](state, { payload }) {
    const { data: { attributes } } = payload;
    return state.concat(attributes);
  },
  [actions.removeChannelSuccess](state, { payload }) {
    const { data: { id } } = payload;
    return state.filter(channel => channel.id !== id);
  },
}, []);

const messages = handleActions({
  [actions.receiveMessageState](state, { payload }) {
    const { data: { attributes } } = payload;
    return state.concat(attributes);
  },
}, []);

const currentChannelId = handleActions({
  [actions.changeCurrentChannelId](state, { payload }) {
    return payload;
  },
}, 0);

export default combineReducers({
  channelCreatingState,
  messageCreatingState,
  channels,
  messages,
  currentChannelId,
  form: formReducer,
});
