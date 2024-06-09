import cl from './errorFormMessage.module.scss';

const ErrorFormMessage = ({ message }) => {
  return <p className={cl.error}>{message}</p>;
};

export default ErrorFormMessage;
