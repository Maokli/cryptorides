import { redirect, redirectDocument } from "react-router-dom";
import { isNullOrEmpty } from "./string.helpers";

const TOKEN_KEY = "token";

export const getUserToken = () => {
  return localStorage.getItem(TOKEN_KEY);
}

export const removeUserToken = () => {
  return localStorage.removeItem(TOKEN_KEY);
}

export const setUserToken = (token: string) => {
  return localStorage.setItem(TOKEN_KEY, token);
}

export const isAuthenticated = () => {
  const token = getUserToken();

  return !isNullOrEmpty(token);
}
export const handleLogout = () => {
  window.location.reload();
  removeUserToken() ;
}