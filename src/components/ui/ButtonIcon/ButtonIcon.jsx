import cl from './buttonIcon.module.scss';
import Icon from '../Icon';
import PropTypes from 'prop-types';

const ButtonIcon = ({ onClick, addClass = '', icon }) => {
  return (
    <button
      type="button"
      className={
        addClass ? `${cl['button-icon']} ${cl[addClass]}` : cl['button-icon']
      }
      onClick={onClick}
    >
      <Icon icon={icon} />
    </button>
  );
};

ButtonIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  addClass: PropTypes.string,
  icon: PropTypes.string.isRequired,
};

export default ButtonIcon;
