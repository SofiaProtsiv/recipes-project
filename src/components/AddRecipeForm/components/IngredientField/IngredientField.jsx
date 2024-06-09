import PropTypes from 'prop-types';
import cl from './ingredientField.module.scss';

const IngredientField = ({ index, register, remove, errors }) => (
  <div className={cl.ingredient}>
    <select {...register(`ingredients.${index}.ingredient`)}>
      <option value="">Select ingredient...</option>
      <option value="salt">Salt</option>
      <option value="pepper">Pepper</option>
      <option value="sugar">Sugar</option>
      <option value="flour">Flour</option>
    </select>
    <input
      type="text"
      placeholder="Quantity"
      {...register(`ingredients.${index}.quantity`)}
    />
    <button type="button" onClick={remove}>
      Remove
    </button>
    {errors && (
      <p className={cl.error}>
        {errors.ingredient?.message || errors.quantity?.message}
      </p>
    )}
  </div>
);

IngredientField.propTypes = {
  index: PropTypes.number.isRequired,
  register: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    ingredient: PropTypes.shape({
      message: PropTypes.string,
    }),
    quantity: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
};

export default IngredientField;
