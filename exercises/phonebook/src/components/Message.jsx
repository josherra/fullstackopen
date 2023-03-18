export const Message = ({ message }) => {
  if (!message) {
    return null;
  }

  return <div className={`message ${message.type}`}>{message.message}</div>;
};
