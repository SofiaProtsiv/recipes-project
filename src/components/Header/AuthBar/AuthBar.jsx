import { useState } from 'react';
import Modal from '../../ui/Modal';
import cl from './authBar.module.scss';

const AuthBar = () => {
  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = type => {
    setModalType(type);
    setShowModal(!showModal);
  };

  return (
    <div className={cl.authBtns}>
      <button className={cl.signIn} onClick={() => toggleModal('SignInModal')}>Sign In</button>
      <button className={cl.signUp} onClick={() => toggleModal('SignUpModal')}>Sign Up</button>
      {/* <button onClick={() => toggleModal()}>Log Out</button> */}
      {showModal && <Modal onClose={toggleModal} type={modalType} />}
    </div>
  );
};

export default AuthBar;
