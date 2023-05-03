
import { parseCookies, setCookie, destroyCookie } from 'nookies';


export const setCookies = (name: string, value: string, options?: { [key: string]: any }) => {
  setCookie(null, name, JSON.stringify({ value, expires: new Date(Date.now() + 360000) }), {
    path: '/',
    ...options,
  });
};

export const getCookies = (name: string): string | undefined => {
  const cookies = parseCookies();
  const cookie = cookies[name];
  if (cookie) {
    try {
      const parsedCookie = JSON.parse(cookie);
      if (parsedCookie.expires && new Date() > new Date(parsedCookie.expires)) {
        // cookie has expired, remove it
        destroyCookie(null, name);
        return undefined;
      }
      return parsedCookie.value;
    } catch (e) {
      // cookie value is not valid JSON, return undefined
      return undefined;
    }
  }
  return undefined;
};


export const removeCookie = (name: string) => {
  destroyCookie(null, name, {
    path: '/',
  });
};


