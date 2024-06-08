import { createPortal, cloneElement } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import LogOutModal from '../../LogOutModal';
import Button from '../Button';
import sprite from '../../../assets/icons/sprite.svg';
import cl from './modal.module.scss';

const Modal = ({ children }) => {
  const modalRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    const localPathArr = location.pathname.split('/');
    console.log('click', location.state, localPathArr[localPathArr.length - 2]);
    navigate(
      location.state?.from
        ? location.state.from
        : `/${localPathArr[localPathArr.length - 2]}`
    );
  };

  const handleEscape = event => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  const handleClickOutside = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
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

  const isLogOutModal = children && children.type === LogOutModal;

  return createPortal(
    <div className={cl.wrapper}>
      <div className={cl.modal} ref={modalRef}>
        {children}
        {isLogOutModal && (
          <Button addClass={cl.cancel_button} onClick={handleCloseModal}>
            Cancel
          </Button>
        )}
        <button
          className={cl.close_button}
          aria-label="Close modal window"
          onClick={handleCloseModal}
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
