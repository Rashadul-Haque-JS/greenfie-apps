export function getClientURL() {
    return process.env.NODE_ENV === 'development'
      ? process.env.CLIENT_URL
      : process.env.NEXT_PUBLIC_CLIENT_URL;
  }
  