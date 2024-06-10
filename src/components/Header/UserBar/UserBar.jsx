import cl from './userBar.module.scss';
import { useState } from 'react';

const UserBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleProfileClick = () => {
    // handle profile link click
  };

  const handleLogoutClick = () => {
    // handle logout link click
  };

  const handleUserInfoClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={cl.userBar}>
      <div className={cl.userInfo} onClick={handleUserInfoClick}>
        <img
          className={cl.avatar}
          src="/public/images/categories/Breakfast.jpg"
          alt="User Avatar"
        />
        <div className={cl.name}>
          <span className={cl.username}>Victoria</span>
          <svg
            className={`${isMenuOpen ? cl.active : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M4.5 11.25L9 6.75L13.5 11.25"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <ul className={`${cl.menu} ${isMenuOpen ? cl.active : ''}`}>
        <li className={cl.menuItem}>
          <button
            className={cl.menuLink}
            type="button"
            onClick={handleProfileClick}
          >
            Profile
          </button>
        </li>
        <li className={cl.menuItem}>
          <button
            className={cl.menuLink}
            type="button"
            onClick={handleLogoutClick}
          >
            <span>Log out</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M5.25 12.75L12.75 5.25"
                stroke="white"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.25 5.25H12.75V12.75"
                stroke="white"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserBar;
