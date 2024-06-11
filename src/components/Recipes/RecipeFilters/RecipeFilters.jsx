import cl from './recipeFilters.module.scss';
import Select from '../../ui/Select';
import PropTypes from 'prop-types';

const RecipeFilters = ({ selectList = [] }) => {
  return (
    <>
      <ul className={cl.className}>
        {selectList.map(item => {
          if (item) {
            return (
              <li key={item}>
                <Select item={item} />
              </li>
            );
          }
          return null;
        })}
      </ul>
    </>
  );
};

RecipeFilters.propTypes = {
  selectList: PropTypes.arrayOf(PropTypes.string),
};

export default RecipeFilters;
