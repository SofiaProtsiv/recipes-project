/* eslint-disable react/no-unescaped-entities */
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogOutMutation } from '../../redux/auth/AuthApi';
import { logOutUser } from '../../redux/auth/AuthSlice';
import Button from '../ui/Button';
import SecondTitle from '../ui/SecondTitle';
import Subtitle from '../ui/Subtitle/Subtitle';
import cl from './logOutModal.module.scss';

const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logOut] = useLogOutMutation();

  const handleLogOut = async () => {
    try {
      await logOut().unwrap();
      dispatch(logOutUser());
      navigate('/');
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className={cl.container}>
      <SecondTitle addClass={cl.title_center}>Log out</SecondTitle>
      <Subtitle addClass={cl.title_center}>
        You can always log back in at any time.
      </Subtitle>
      <div className={cl.wrapper}>
        <Button addClass={cl.logout} onClick={handleLogOut}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default LogOutModal;
