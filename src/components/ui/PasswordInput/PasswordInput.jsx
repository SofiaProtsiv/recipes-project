import { useState } from 'react';
import sprite from '../../../assets/icons/sprite.svg';
import cl from './input.module.scss';

const PasswordInput = ({ register, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cl.input_container}>
      <input
        className={cl.input_form}
        type={showPassword ? 'text' : 'password'}
        placeholder="Password*"
        aria-label="Enter your password"
        {...register('password')}
      />
      <button
        className={cl.toggle_password}
        type="button"
        onClick={() => setShowPassword(prev => !prev)}
      >
        <svg className={cl.toggle_icon} width={18} height={18}>
          <use href={`${sprite}#${showPassword ? 'eye' : 'eye_off'}`}></use>
        </svg>
      </button>
      {errors.password && <p className={cl.error}>{errors.password.message}</p>}
    </div>
  );
};

export default PasswordInput;
