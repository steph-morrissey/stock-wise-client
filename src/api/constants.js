export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : 'deployed api link';

export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const CATEGORIES_URI = `${BASE_URL}/api/categories`;
export const SUPPLIERS_URI = `${BASE_URL}/api/suppliers`;
export const ADD_PRODUCT_URI = `${BASE_URL}/api/products`;
