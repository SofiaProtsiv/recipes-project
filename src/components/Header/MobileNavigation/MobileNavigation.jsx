import { useState } from 'react';
import cl from './mobileNavigation.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../ui/Logo';
const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const handleToggle = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'visible';
  };

  return (
    <nav className={cl.mobileNavigation}>
      <div
        className={`${cl.burgerMenu} ${isOpen ? cl.open : ''}
        ${location.pathname != '/' ? cl.black : ''}`}
        onClick={handleToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
        >
          <path
            d="M24.5 7H3.5"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M24.5 11.6665H3.5"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M24.5 16.3335H3.5"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M24.5 21H3.5"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className={`${cl.menuItems} ${isOpen ? cl.open : ''}`}>
        <div className={cl.topElements}>
          <Logo />
          <button className={cl.closeBtn} onClick={handleToggle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M21 7L7 21"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 7L21 21"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <ul className={cl.menuWrapper}>
          <li>
            <NavLink onClick={handleToggle} to="/" activeClassName={cl.active}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleToggle} to="recipe/add" activeClassName={cl.active}>
              Add Recipe
            </NavLink>
          </li>
        </ul>
        <div className={cl.imgContainer}>
          <img src="/public/images/categories/Breakfast.jpg" alt="cake" />
          <img src="/public/images/categories/Beef.jpg" alt="meat dish" />
        </div>
      </div>
    </nav>
  );
};
export default MobileNavigation;
