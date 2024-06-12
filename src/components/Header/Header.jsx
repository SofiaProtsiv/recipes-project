import Logo from '../ui/Logo';
import AuthBar from './AuthBar';
import Navigation from './Navigation';
import UserBar from './UserBar';

const Header = () => {
  const isUserAuthorized = false;

  return (
    <header>
      <Logo />

      {isUserAuthorized ? (
        <>
          <Navigation />
          <UserBar />
        </>
      ) : (
        <AuthBar />
      )}
    </header>
  );
};

export default Header;
