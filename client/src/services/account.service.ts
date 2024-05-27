import { jwtDecode } from 'jwt-decode'
export const getUserIdFromToken = () => {
  const token = localStorage.getItem("jwtToken");

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub; 
      return userId;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  } else {
    console.error("Token not found in localStorage");
    return null;
  }
};
