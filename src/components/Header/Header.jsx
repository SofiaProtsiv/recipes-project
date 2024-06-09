import Logo from '../ui/Logo';
import AuthBar from './AuthBar';
import Navigation from './Navigation';
import UserBar from './UserBar';
import cl from './header.module.scss';

const Header = () => {
  const isUserAuthorized = false;

  return (
    <header className={cl.header}>
      <Logo />

      {isUserAuthorized ? (
        <AuthBar />
      ) : (
        <>
          <Navigation />
          <UserBar />
        </>
      )}
    </header>
  );
};

export default Header;
