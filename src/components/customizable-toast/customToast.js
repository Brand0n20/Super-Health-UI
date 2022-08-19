import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

/**
 * Generate a custom toast with the desired content message.
 * @param {string} messageContent - The message to display.
 * @param {string} toastType - The toast type ("error", "info", "success", "warn").
 *  "warn" is short for warning.
 */
const customToast = (messageContent, toastType = null) => {
  const toastParameters = {
    position: 'top-center',
    autoClose: 8000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined

  };

  if (toastType) {
    toast[toastType](messageContent, toastParameters);
  } else {
    toast(messageContent, toastParameters);
  }
};

export default customToast;
