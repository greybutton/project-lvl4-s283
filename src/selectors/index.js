import { createSelector } from 'reselect';

export const getChannels = state => state.channels;
export const channelsSelector = createSelector(
  getChannels,
  channels => channels,
);

export const getMessages = (state) => {
  const { currentChannelId, messages } = state;
  const result = messages.filter(message => message.channelId === currentChannelId).reverse();
  return result;
};
export const messagesSelector = createSelector(
  getMessages,
  messages => messages,
);
