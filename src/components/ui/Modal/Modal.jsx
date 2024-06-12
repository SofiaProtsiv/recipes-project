import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import LogOutModal from '../../LogOutModal';
import SignUpModal from '../../SignUpModal';
import SignInModal from '../../SignInModal';
import Button from '../Button';
import sprite from '../../../assets/icons/sprite.svg';
import cl from './modal.module.scss';

const Modal = ({ onClose, type = 'LogOutModal' }) => {
  //type = 'LogOutModal', 'SignUpModal', 'SignInModal'

  const [modalType, setModalType] = useState(type);
  const [modalHeight, setModalHeight] = useState(0);
  const modalRef = useRef(null);

  const { name } = useSelector(state => state.authSlice?.user);

  const handleEscape = event => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleClickOutside = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false);
    document.addEventListener('mousedown', handleClickOutside, false);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape, false);
      document.removeEventListener('mousedown', handleClickOutside, false);
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const updateModalHeight = () => {
      setModalHeight(window.innerHeight);
    };

    updateModalHeight();
    window.addEventListener('resize', updateModalHeight);

    return () => {
      window.removeEventListener('resize', updateModalHeight);
    };
  }, []);

  const isLogOutModal = type === 'LogOutModal';
  const isSignUpModal = type === 'SignUpModal';

  return createPortal(
    <div
      className={`${cl.wrapper} ${modalHeight < 600 && cl.wrapper_scroll} ${
        cl.scroll_hidden
      }`}
    >
      <div className={cl.modal} ref={modalRef}>
        {modalType === 'SignUpModal' && (
          <SignUpModal setModalType={setModalType} />
        )}
        {modalType === 'SignInModal' && (
          <SignInModal onClose={onClose} setModalType={setModalType} />
        )}
        {modalType === 'LogOutModal' && <LogOutModal onClose={onClose} />}

        {(isLogOutModal || (name && isSignUpModal)) && (
          <Button addClass={cl.cancel_button} onClick={onClose}>
            {isLogOutModal && `Cancel`}
            {isSignUpModal && `Close`}
          </Button>
        )}
        <button
          className={cl.close_button}
          aria-label="Close modal window"
          onClick={onClose}
        >
          <svg className={cl.close_icon} width={24} height={24}>
            <use href={`${sprite}#close`}></use>
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
