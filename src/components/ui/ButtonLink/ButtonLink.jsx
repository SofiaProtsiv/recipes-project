import cl from './buttonLink.module.scss';
import Icon from '../Icon';
import { Link } from 'react-router-dom';

export default function ButtonLink({ to, addClass = '', icon, children }) {
  return (
    <Link
      className={
        addClass ? `${cl['button-link']} ${addClass}` : cl['button-link']
      }
      to={to}
    >
      {icon && <Icon icon={icon} />}

      {children}
    </Link>
  );
}
