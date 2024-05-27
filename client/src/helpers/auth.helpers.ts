import { isNullOrEmpty } from "./string.helpers";
import { jwtDecode } from "jwt-decode";

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

export const getIdFromToken = (token: string): string | null => {
  try {
    const decoded = jwtDecode(token);
    return decoded.sub ?? null;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};