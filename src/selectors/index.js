import { createSelector } from 'reselect';

export const getChannels = state => state.entities.channels;
export const channelsSelector = createSelector(
  getChannels,
  channels => Object.values(channels),
);

export const getMessages = (state) => {
  const { result: { currentChannelId, messages } } = state;
  const result = messages.filter(message => message.channelId === currentChannelId).reverse();
  return result;
};
export const messagesSelector = createSelector(
  getMessages,
  messages => messages,
);
