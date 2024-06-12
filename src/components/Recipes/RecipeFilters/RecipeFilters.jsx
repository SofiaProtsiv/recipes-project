import cl from './recipeFilters.module.scss';
import Select from '../../ui/Select';
import PropTypes from 'prop-types';
import { ingredientsApi } from '../../../redux/ingredients/ingredientsApi';
import { areasApi } from '../../../redux/areas/areasApi';
import { useEffect, useState } from 'react';

const RecipeFilters = ({ selectList = [], handleIngredient, handleArea }) => {
  const [areasList, setAreasList] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const ingredientsResp = ingredientsApi.useGetIngredientsQuery();
  const areasResp = areasApi.useGetAreasQuery();

  useEffect(() => {
    if (ingredientsResp.status === 'fulfilled') {
      setIngredientsList(ingredientsResp.data);
    }
    if (areasResp.status === 'fulfilled') {
      setAreasList(areasResp.data);
    }
  }, [areasList, ingredientsList, areasResp, ingredientsResp]);

  return (
    <>
      <ul className={cl.recipeFilters}>
        {selectList.map(item => {
          if (item) {
            return (
              <li key={item}>
                <Select
                  options={item === 'ingredients' ? ingredientsList : areasList}
                  onChange={
                    item === 'ingredients' ? handleIngredient : handleArea
                  }
                  value={item}
                  className={item === 'ingredients' ? 'ingredients' : 'areas'}
                />
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
  selectList: PropTypes.array,
  handleIngredient: PropTypes.func,
  handleArea: PropTypes.func,
};

export default RecipeFilters;
