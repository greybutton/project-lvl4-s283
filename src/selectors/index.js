import { createSelector } from 'reselect';

export const getChannels = state => state.channels;
export const channelsSelector = createSelector(
  getChannels,
  channels => channels,
);

export const getMessages = state => state.messages;
export const messagesSelector = createSelector(
  getMessages,
  messages => messages,
);
