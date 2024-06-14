import cl from './buttonLink.module.scss';
import Icon from '../Icon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ButtonLink({ to, addClass = '', icon, children }) {
  return (
    <Link
      className={
        addClass ? `${cl['button-link']} ${cl[addClass]}` : cl['button-link']
      }
      to={to}
    >
      {icon && <Icon icon={icon} />}

      {children}
    </Link>
  );
}

ButtonLink.propTypes = {
  to: PropTypes.string.isRequired,
  addClass: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
};
