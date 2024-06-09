import PropTypes from 'prop-types';
import cl from './cookingTimeControl.module.scss';

const CookingTimeControl = ({ value, onDecrement, onIncrement }) => (
  <div className={cl['cooking-time']}>
    <button type="button" onClick={onDecrement}>
      -
    </button>
    <span>{value} minutes</span>
    <button type="button" onClick={onIncrement}>
      +
    </button>
  </div>
);

CookingTimeControl.propTypes = {
  value: PropTypes.number.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
};

export default CookingTimeControl;
