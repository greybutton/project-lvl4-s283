export default (data) => {
  const date = new Date(data);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  return `${hours}:${minutes}`;
};
