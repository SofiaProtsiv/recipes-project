/* eslint-disable react/no-unescaped-entities */
import Button from '../ui/Button';
import MainTitle from '../ui/MainTitle';
import Subtitle from '../ui/Subtitle/Subtitle';
import cl from './logOutModal.module.scss';

const handleLogOut = () => {
  // Відправка даних на backend, logout
  console.log('logout');
};

const LogOutModal = () => {
  return (
    <div className={cl.container}>
      <MainTitle addClass={cl.title_center}>Log out</MainTitle>
      <Subtitle addClass={cl.title_center}>
        You can always log back in at my time.
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
