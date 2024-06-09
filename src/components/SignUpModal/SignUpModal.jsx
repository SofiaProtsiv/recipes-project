/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Button from '../ui/Button';
import MainTitle from '../ui/MainTitle';
import SignUpForm from './SignUpForm';
import cl from './signUpModal.module.scss';

const SignUpModal = ({ setModalType }) => {
  const handleSignClick = () => {
    setModalType('SignInModal');
  };

  return (
    <>
      <MainTitle addClass={cl.title_center}>Sign up</MainTitle>
      <SignUpForm />
      <div className={cl.footer}>
        <p>I already have an account?</p>
        <Button onClick={handleSignClick}>Sign in</Button>
      </div>
    </>
  );
};

export default SignUpModal;
