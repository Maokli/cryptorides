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
