import { toast } from 'react-toastify';

export const notifySuccess = () => {
  toast.success("Login successful", {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifyError = () => {
  // aren't there other error (apart from login errors)?? -> To be discussed
  toast.error("Login failed. Please try again.", {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
