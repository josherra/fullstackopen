/**
 * A utility function for easily providing a notification event with a timeout.
 * @param {*} setMessage
 * @param {*} message
 * @param {*} delay
 */
export const displayMessage = (setMessage, message, delay = 5000) => {
  setMessage(message);
  setTimeout(() => {
    setMessage(null);
  }, delay);
};
