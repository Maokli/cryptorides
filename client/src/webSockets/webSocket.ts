import { io, Socket } from 'socket.io-client';
import { getUserToken} from '../helpers/auth.helpers'
export function createWebSocket(): Socket {
  const serverUrl = 'http://localhost:3001'; 
  const token = getUserToken(); 
  const headers = {
    Authorization: `Bearer ${token}`, 
  };

  const socket = io(serverUrl, {
    autoConnect: false,
    extraHeaders: headers,
  });

  socket.connect();

  return socket;
}
