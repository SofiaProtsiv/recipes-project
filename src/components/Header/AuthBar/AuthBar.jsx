import { useState } from 'react';
import Modal from '../../ui/Modal';
import cl from './authBar.module.scss';
// const [showModal, setShowModal] = useState(false);
// const toggleModal = () => {
//   setShowModal(!showModal);
// };

// <button onClick={toggleModal}>Show Modal</button>
// {showModal && <Modal onClose={toggleModal} type="SignInModal" />}

const AuthBar = () => {
  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = type => {
    setModalType(type);
    setShowModal(!showModal);
  };

  return (
    <div className={cl.className}>
      <button onClick={() => toggleModal('SignInModal')}>Sign In</button>
      <button onClick={() => toggleModal('SignUpModal')}>Sign Up</button>
      <button onClick={() => toggleModal()}>Log Out</button>

      {showModal && <Modal onClose={toggleModal} type={modalType} />}
    </div>
  );
};

export default AuthBar;
