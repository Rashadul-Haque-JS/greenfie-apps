
import { parseCookies, setCookie, destroyCookie } from 'nookies';

export const setCookies = (name: string, value: string, options?: { [key: string]: any }) => {
  setCookie(null, name, value, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    ...options,
  });
};

export const getCookies = (name: string): string | undefined => {
  return parseCookies()[name];
};

export const removeCookie = (name: string): void => {
  destroyCookie(null, name);
};


