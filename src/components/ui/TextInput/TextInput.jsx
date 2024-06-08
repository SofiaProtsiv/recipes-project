import cl from './input.module.scss';

const TextInput = ({ type, placeholder, register, errors, name }) => {
  return (
    <div className={cl.input_container}>
      <input
        className={cl.input_form}
        type={type}
        placeholder={placeholder}
        aria-label={`Enter your ${name}`}
        {...register(name)}
      />
      {errors[name] && <p className={cl.error}>{errors[name].message}</p>}
    </div>
  );
};

export default TextInput;
