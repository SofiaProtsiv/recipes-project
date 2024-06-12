/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Button from '../ui/Button';
import SecondTitle from '../ui/SecondTitle';
import SignUpForm from './SignUpForm';
import { useSelector } from 'react-redux';
import cl from './signUpModal.module.scss';

const SignUpModal = ({ setModalType }) => {
  const { name, email } = useSelector(state => state.authSlice?.user);
  const handleSignClick = () => {
    setModalType('SignInModal');
  };

  const title = name && email ? `Welcome, ${name}!` : `Sign up`;
  const message = (
    <p className={cl.text}>
      Your account with email {email} has been successfully created.
    </p>
  );

  return (
    <>
      <SecondTitle addClass={cl.title_center}>{title}</SecondTitle>
      {name ? (
        message
      ) : (
        <>
          <SignUpForm />
          <div className={cl.footer}>
            <p>I already have an account?</p>
            <Button onClick={handleSignClick}>Sign in</Button>
          </div>
        </>
      )}
    </>
  );
};

export default SignUpModal;
