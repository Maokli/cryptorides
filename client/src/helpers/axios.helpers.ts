import axios, { AxiosInstance } from 'axios';
import { isAuthenticated, getUserToken } from './auth.helpers';
import { toast } from 'react-toastify';

let isToastShown = false;

const notifySuccess = () => {
  if (!isToastShown) {
    isToastShown = true;
    toast.success("Successfully fetched", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => (isToastShown = false), 
    });
  }
};

const notifyError = (message: string) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const notifyGeneralError = () => {
  toast.error("An error occurred. Please try again.", {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const notifyAuthenticationError = () => {
  toast.error("Authentication error. Please log in again.", {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

class AxiosWithInterceptor {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({baseURL: "http://localhost:3001/graphql"});
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
        setTimeout(() => setIsLoading(false), 1000);
        notifySuccess();
        return response;
      },
      (error: any) => {
        setTimeout(() => setIsLoading(false), 100);
        console.log(error);
        if (!error.response) {
          notifyGeneralError();
        } else if (!error.response.data) {
          if (error.response.status >= 400 && error.response.status < 500) {
            notifyAuthenticationError();
          } else {
            notifyGeneralError();
          }
        } else {
          notifyError(error.response.data.message || "An error occurred");
        }

        return Promise.reject(error);
      }
    );
  }
}

export default new AxiosWithInterceptor();
