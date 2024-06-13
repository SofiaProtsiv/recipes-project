import cl from './buttonIcon.module.scss';
import Button from '../Button';
import Icon from '../Icon';

const ButtonIcon = ({ onClick, addClass = '', icon }) => {
  return (
    <button
      type="button"
      className={
        addClass ? `${cl['button-icon']} ${addClass}` : cl['button-icon']
      }
      onClick={onClick}
    >
      <Icon icon={icon} />
    </button>
  );
};

export default ButtonIcon;
