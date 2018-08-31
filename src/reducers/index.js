import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

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

const channels = handleActions({}, []);

const messages = handleActions({
  [actions.receiveMessageState](state, { payload }) {
    const { data: { attributes } } = payload;
    return state.concat(attributes);
  },
}, []);

const currentChannelId = handleActions({}, 0);

const form = {
  newMessage: handleActions({
    [actions.addMessageFailure](state) {
      const newState = {
        values: state.values,
      };
      return newState;
    },
    [actions.addMessageSuccess]() {
      return undefined;
    },
  }, {}),
};

export default combineReducers({
  messageCreatingState,
  channels,
  messages,
  currentChannelId,
  form: formReducer.plugin(form),
});
