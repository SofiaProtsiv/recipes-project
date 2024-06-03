import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import MainTitle from '../ui/MainTitle';
import cl from './signInModal.module.scss';

const SignInModal = () => {
  return (
    <div className={cl.className}>
      <MainTitle>Sign in</MainTitle>
      <SignInModal />
      <div>
        <p>I already have an account?</p>
        <Button>
          <Link to="/login">Sign up</Link>
        </Button>
      </div>
    </div>
  );
};

export default SignInModal;
