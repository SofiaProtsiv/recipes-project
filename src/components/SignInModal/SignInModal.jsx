import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import MainTitle from '../ui/MainTitle';
import SignInForm from './SignInForm';
import cl from './signInModal.module.scss';

const SignInModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleSignClick = () => {
    navigate('/sign-up');
  };

  return (
    <>
      <MainTitle addClass={cl.title_center}>Sign up</MainTitle>
      <SignInForm />
      <div className={cl.footer}>
        <p>Don't have an account?</p>
        <Button onClick={handleSignClick}> Create an account</Button>
      </div>
    </>
  );
};

export default SignInModal;
