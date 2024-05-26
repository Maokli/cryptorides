import axios from 'axios';
import { isAuthenticated, getUserToken } from './auth.helpers';
import { notifySuccess, notifyError } from './toast.helpers';

class AxiosWithInterceptor {
  instance: any;

  constructor() {
    this.instance = axios.create();
  }

  addInterceptors(setIsLoading: (isLoading: boolean) => void) {
    this.instance.interceptors.request.use((req: any) => {
      setIsLoading(true);

      if (isAuthenticated()) {
        const token = getUserToken();
        if (token) {
          req.headers.Authorization = `Bearer ${token}`;
        }
      }

      return req;
    });

    this.instance.interceptors.response.use(
      (response: any) => {
        setTimeout(() => setIsLoading(false), 100); 
        notifySuccess();
        return response;
        /*
        setTimeout(() => {
          setIsLoading(false);
          notifySuccess();
          return response;
        }, 2000); // Simulating a 2-second delay
        */
      },
      (error: any) => {
        setTimeout(() => setIsLoading(false), 100); 
        notifyError();
        return Promise.reject(error);
      }
    );
  }
}

export default new AxiosWithInterceptor();
