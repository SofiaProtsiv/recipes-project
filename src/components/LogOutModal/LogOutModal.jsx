import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import MainTitle from '../ui/MainTitle';
import Subtitle from '../ui/Subtitle/Subtitle';
import cl from './LogOutModal.module.scss';

const LogOutModal = () => {
  return (
    <div className={cl.className}>
      <MainTitle>Log out</MainTitle>
      <Subtitle>You can always log back in at my time.</Subtitle>
      <div>
        <Button>
          <Link to="/register">Create</Link>
        </Button>
        <Button>Cancel</Button>
      </div>
    </div>
  );
};

export default LogOutModal;
