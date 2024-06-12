import React from 'react';
import Button from '../ui/Button';
import MainTitle from '../ui/MainTitle';
import SignInForm from './SignInForm';
import cl from './signInModal.module.scss';

const SignInModal = ({ onClose, setModalType }) => {
  const handleSignClick = () => {
    setModalType('SignUpModal');
  };

  return (
    <>
      <MainTitle>Sign in</MainTitle>
      <SignInForm onClose={onClose} />
      <div className={cl.footer}>
        <p>Don't have an account?</p>
        <Button onClick={handleSignClick}> Create an account</Button>
      </div>
    </>
  );
};

export default SignInModal;
