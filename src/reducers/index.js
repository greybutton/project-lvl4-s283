import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
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

const editChannelState = handleActions({
  [actions.editChannel](state, { payload }) {
    return payload;
  },
}, {
  modal: false,
  channel: null,
});

const deleteChannelState = handleActions({
  [actions.deleteChannel](state, { payload }) {
    return payload;
  },
}, {
  modal: false,
  id: null,
});

const entities = handleActions({
  [combineActions(actions.receiveChannel, actions.updateChannelSuccess)]: (
    state,
    { payload },
  ) => {
    const { channels } = state;
    const { data: { attributes, id } } = payload;
    const newState = {
      ...state,
      channels: {
        ...channels,
        [id]: attributes,
      },
    };
    return newState;
  },
  [actions.removeChannelSuccess](state, { payload }) {
    const { channels } = state;
    const { data: { id } } = payload;
    const newChannels = Object.values(channels)
      .filter(channel => channel.id !== id)
      .reduce((acc, channel) => ({
        ...acc,
        [channel.id]: channel,
      }), {});
    const newState = {
      ...state,
      channels: newChannels,
    };
    return newState;
  },
}, {
  channels: {},
});

const result = handleActions({
  [actions.changeCurrentChannelId](state, { payload }) {
    const newState = {
      ...state,
      currentChannelId: payload,
    };
    return newState;
  },
  [actions.receiveMessage](state, { payload }) {
    const { messages } = state;
    const { data: { attributes } } = payload;
    const newMessages = messages.concat(attributes);
    const newState = {
      ...state,
      messages: newMessages,
    };
    return newState;
  },
  [actions.receiveChannel](state, { payload }) {
    const { channels } = state;
    const { data: { id } } = payload;
    const newChannels = [...channels, id];
    const newState = {
      ...state,
      channels: newChannels,
    };
    return newState;
  },
  [actions.removeChannelSuccess](state, { payload }) {
    const { channels } = state;
    const { data: { id } } = payload;
    const newChannels = channels.filter(idx => idx !== id);
    const newState = {
      ...state,
      channels: newChannels,
    };
    return newState;
  },
}, {
  channels: [],
  messages: [],
  currentChannelId: 0,
});

export default combineReducers({
  channelCreatingState,
  messageCreatingState,
  editChannelState,
  deleteChannelState,
  entities,
  result,
  form: formReducer,
});
