import cookies from 'js-cookie';

export const setCookies = (field, value) => cookies.set(field, value);
export const getCookies = field => cookies.get(field);
