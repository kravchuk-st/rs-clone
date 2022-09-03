function getCookieValue(cookieKey: string) {
  return document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith(`${cookieKey}=`))
    ?.split('=')[1];
}

export default getCookieValue;
