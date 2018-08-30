import format from 'date-fns/format';

export default (date) => {
  const result = format(
    new Date(date),
    'H:m',
  );
  return result;
};
