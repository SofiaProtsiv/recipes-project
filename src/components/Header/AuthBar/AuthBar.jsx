import { NavLink } from 'react-router-dom';
import cl from './authBar.module.scss';

const AuthBar = () => {
  return (
    <div className={cl.authBtns}>
      <NavLink to="/login" className={cl.signIn}>
        sign in
      </NavLink>
      <NavLink to="/register" className={cl.signUp}>
        sign up
      </NavLink>
    </div>
  );
};

export default AuthBar;
