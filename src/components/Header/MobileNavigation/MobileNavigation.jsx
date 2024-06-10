import { useState } from 'react';
import cl from './mobileNavigation.module.scss';
import { NavLink } from 'react-router-dom';
const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'visible';
  };

  return (
    <nav className={cl.mobileNavigation}>
      <div
        className={`${cl.burgerMenu} ${isOpen ? cl.open : ''}`}
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
      <ul className={`${cl.menuItems} ${isOpen ? cl.open : ''}`}>
        <li>
          <NavLink to="/" activeClassName={cl.active}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName={cl.active}>
            Add Recipe
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default MobileNavigation;
