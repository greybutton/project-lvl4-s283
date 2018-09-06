export default (data) => {
  const { channels, messages, currentChannelId } = data;
  const byId = channels.reduce((acc, channel) => ({
    ...acc,
    [channel.id]: channel,
  }), {});
  const allIds = channels.map(channel => channel.id);
  const newChannels = {
    byId,
    allIds,
  };
  const result = {
    channels: newChannels,
    messages,
    currentChannelId,
  };
  return result;
};
