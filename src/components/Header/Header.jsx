import Logo from '../ui/Logo';
import AuthBar from './AuthBar';
import MobileNavigation from './MobileNavigation';
import Navigation from './Navigation';
import UserBar from './UserBar';
import cl from './header.module.scss';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const isUserAuthorized = false;
  const isMobile = true;

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className={`${cl.header} ${!isHomePage ? cl.black : ''}`}>
      <Logo />

      {isUserAuthorized ? (
        isMobile ? (
          <div className={cl.mobile}>
            <UserBar />
            <MobileNavigation />
          </div>
        ) : (
          <>
            <Navigation />
            <UserBar />
          </>
        )
      ) : (
        <AuthBar />
      )}
    </header>
  );
};

export default Header;
