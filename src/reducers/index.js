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
    const { byId, allIds } = state;
    const { data: { attributes, id } } = payload;
    const newState = {
      byId: {
        ...byId,
        [id]: attributes,
      },
      allIds: [...allIds, id],
    };
    return newState;
  },
  [actions.removeChannelSuccess](state, { payload }) {
    const { byId, allIds } = state;
    const { data: { id } } = payload;
    const newAllIds = allIds.filter(idx => idx !== id);
    const newState = {
      byId,
      allIds: newAllIds,
    };
    return newState;
  },
  [actions.updateChannelSuccess](state, { payload }) {
    const { byId, allIds } = state;
    const { data: { attributes, id } } = payload;
    const newState = {
      byId: {
        ...byId,
        [id]: attributes,
      },
      allIds,
    };
    return newState;
  },
}, {
  byId: {},
  allIds: [],
});

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
