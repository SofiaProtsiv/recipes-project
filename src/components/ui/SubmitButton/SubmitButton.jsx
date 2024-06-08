import cl from './button.module.scss';

const SubmitButton = ({ onSubmit, addClass = '', children }) => {
  return (
    <button
      type="submit"
      className={addClass ? `${cl.submit} ${addClass}` : cl.submit}
      onSubmit={onSubmit}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
