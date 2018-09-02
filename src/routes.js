const host = '/api/v1';

// Create new channel
// POST /channels
// { attributes: { name: 'your text' } }

// Get list of channels
// GET /channels

// Update channel
// PATCH /channels/:id
// { attributes: { name: 'your text' } }

// Delete channel
// DELETE /channels/:id

// Create message
// POST /channels/:channelId/messages
// { attributes: { your data } }

// Get list of messages
// GET /channels/:channelId/messages


export default {
  channelsUrl: () => [host, 'channels'].join('/'),
  channelUrl: id => [host, 'channels', id].join('/'),
  messagesUrl: id => [host, 'channels', id, 'messages'].join('/'),
};
