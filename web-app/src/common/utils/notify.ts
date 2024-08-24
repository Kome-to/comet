import { Bounce, toast } from 'react-toastify';
class Notify {
  constructor() {}

  public success = (text: string) =>
    toast.success(text, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnFocusLoss: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });

  public error = (text: string) =>
    toast.error(text, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      pauseOnFocusLoss: false,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });
}

const notify = new Notify();

export default notify;
