import Logo from '../ui/Logo';
import AuthBar from './AuthBar';
import MobileNavigation from './MobileNavigation';
import Navigation from './Navigation';
import UserBar from './UserBar';
import cl from './header.module.scss';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFetchCurrentUserQuery } from '../../redux/auth/AuthApi';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [isUserAuthorized, setIsUserAuthorized] = useState(false);
  const { isLoggedIn } = useSelector(state => state.authSlice);
  const { data: user, isLoading } = useFetchCurrentUserQuery();

  useEffect(() => {
    setIsMobile(window.innerWidth < 769);
  }, []);

  useEffect(() => {
    setIsUserAuthorized(isLoggedIn);
  }, [isLoggedIn]);

  const location = useLocation();
  const isMainLocation = location.pathname === '/';
  const isWhiteHeader =
    location.pathname === '/' || location.pathname.includes('/categories');

  return (
    <header className={`${cl.header} ${isWhiteHeader ? '' : cl.black}`}>
      <Logo />

      {isUserAuthorized ? (
        isMobile ? (
          <div className={cl.mobile}>
            {!isLoading && <UserBar user={user} />}
            {!isMainLocation && <MobileNavigation />}
          </div>
        ) : (
          <>
            {!isMainLocation && <Navigation />}
            {!isLoading && <UserBar user={user} />}
          </>
        )
      ) : (
        !isLoading && <AuthBar />
      )}
    </header>
  );
};

export default Header;
