import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import LogOutModal from '../../LogOutModal';
import SignUpModal from '../../SignUpModal';
import SignInModal from '../../SignInModal';
import Button from '../Button';
import sprite from '../../../assets/icons/sprite.svg';
import cl from './modal.module.scss';

const Modal = ({ onClose, type = 'LogOutModal' }) => {
  //type = 'LogOutModal', 'SignUpModal', 'SignInModal'

  const [modalType, setModalType] = useState(type);
  const modalRef = useRef(null);

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

  const isLogOutModal = type === 'LogOutModal';

  return createPortal(
    <div className={cl.wrapper}>
      <div className={cl.modal} ref={modalRef}>
        {modalType === 'SignUpModal' && (
          <SignUpModal setModalType={setModalType} />
        )}
        {modalType === 'SignInModal' && (
          <SignInModal setModalType={setModalType} />
        )}
        {modalType === 'LogOutModal' && <LogOutModal />}

        {isLogOutModal && (
          <Button addClass={cl.cancel_button} onClick={onClose}>
            Cancel
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

// example
// const [showModal, setShowModal] = useState(false);
// const toggleModal = () => {
//   setShowModal(!showModal);
// };

// <button onClick={toggleModal}>Show Modal</button>
// {showModal && <Modal onClose={toggleModal} type="SignInModal" />}
