/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import MainTitle from '../ui/MainTitle';
import cl from './signUpModal.module.scss';

const SignUpModal = () => {
  return (
    <div className={cl.className}>
      <MainTitle>Sign up</MainTitle>
      <SignUpModal />
      <div>
        <p>I don't have an account yet</p>
        <Button>
          <Link to="/register">Sign up</Link>
        </Button>
      </div>
    </div>
  );
};

export default SignUpModal;
