import Logo from '../ui/Logo';
import AuthBar from './AuthBar';
import MobileNavigation from './MobileNavigation';
import Navigation from './Navigation';
import UserBar from './UserBar';
import cl from './header.module.scss';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authApi } from '../../redux/auth/AuthApi';

const Header = () => {
  const [user, setUser] = useState(null);

  const { data, isFetching, isSuccess, isError } =
    authApi.useFetchCurrentUserQuery({});

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
  }, [isSuccess, isError, isFetching, data]);

  const isUserAuthorized = user;
  const isMobile = window.innerWidth < 768;

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className={`${cl.header} ${!isHomePage ? cl.black : ''}`}>
      <Logo />

      {isUserAuthorized ? (
        isMobile ? (
          <div className={cl.mobile}>
            <UserBar user={user}/>
            <MobileNavigation />
          </div>
        ) : (
          <>
            <Navigation />
            <UserBar user={user}/>
          </>
        )
      ) : (
        <AuthBar />
      )}
    </header>
  );
};

export default Header;
