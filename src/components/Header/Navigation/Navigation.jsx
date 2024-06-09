import cl from './navigation.module.scss';
import { NavLink, useLocation } from 'react-router-dom';

const Navigation = () => {

  const location = useLocation();
  
  return (
    <nav className={cl.nav}>
      <NavLink className={cl.link} to="/home" state={{ from: location }}>
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${cl.link} ${cl.active}` : cl.link
        }
        to="/add-recipe"
        state={{ from: location }}
      >
        Add Recipe
      </NavLink>
    </nav>
  );
};

export default Navigation;
