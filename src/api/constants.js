export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'deployed api link';

export const LOGIN_URL = `${BASE_URL}/login`;
export const REGISTER_URL = `${BASE_URL}/register`;
