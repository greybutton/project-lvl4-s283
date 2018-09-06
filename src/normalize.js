import { normalize, schema } from 'normalizr';

export default (data) => {
  const channel = new schema.Entity('channels');
  const mySchema = { channels: [channel] };
  const normalizedData = normalize(data, mySchema);
  return normalizedData;
};
