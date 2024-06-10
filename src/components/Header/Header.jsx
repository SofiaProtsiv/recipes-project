import Logo from '../ui/Logo';
import AuthBar from './AuthBar';
import MobileNavigation from './MobileNavigation';
import Navigation from './Navigation';
import UserBar from './UserBar';
import cl from './header.module.scss';

const Header = () => {
  const isUserAuthorized = false;
  const isMobile = false;

  return (
    <header className={cl.header}>
      <Logo />

      {isUserAuthorized ? (
        <AuthBar />
      ) : isMobile ? (
        <div className={cl.mobile}>
          <UserBar />
          <MobileNavigation />
        </div>
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
