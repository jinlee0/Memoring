const ACCESS_TOKEN = "access-token";

export const getAccessToken = () => {
  return window.localStorage.getItem(ACCESS_TOKEN);
}

export const setAccessToken = (token) => {
  window.localStorage.setItem(ACCESS_TOKEN, token);
}

export const removeToken = () => {
  window.localStorage.removeItem(ACCESS_TOKEN);
}

export default {
  getAccessToken,
  setAccessToken,
  removeToken,
}