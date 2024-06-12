import cl from './recipeFilters.module.scss';
import Select from '../../ui/Select';
import PropTypes from 'prop-types';
import { ingredientsApi } from '../../../redux/ingredients/ingredientsApi';
import { areasApi } from '../../../redux/areas/areasApi';
import { useEffect, useState } from 'react';
import { categoriesApi } from '../../../redux/categories/categoriesApi';

const RecipeFilters = ({ handleIngredient, handleArea, handleCategories }) => {
  const [selectList, setSelectList] = useState([]);
  const [areasList, setAreasList] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const {
    data: ingredientsResp,
    isFetching: isIngredientsFetching,
    isSuccess: isIngredientsSuccess,
    isError: isIngredientsError,
    error: ingredientsError,
  } = ingredientsApi.useGetIngredientsQuery();
  const {
    data: areasResp,
    isFetching: isAreasFetching,
    isSuccess: isAreasSuccess,
    isError: isAreasError,
    error: areasError,
  } = areasApi.useGetAreasQuery();
  const {
    data: categoriesResp,
    isFetching: isCategoriesFetching,
    isSuccess: isCategoriesSuccess,
    isError: isCategoriesError,
    error: categoriesError,
  } = categoriesApi.useGetCategoriesQuery();

  useEffect(() => {
    if (isCategoriesSuccess && ingredientsResp) {
      setIngredientsList(ingredientsResp);
      setSelectList(prevSelectList => [...prevSelectList, 'ingredients']);
    }
  }, [isCategoriesSuccess, ingredientsResp]);

  useEffect(() => {
    if (isAreasSuccess && areasResp) {
      setAreasList(areasResp);
      setSelectList(prevSelectList => [...prevSelectList, 'area']);
    }
  }, [isAreasSuccess, areasResp]);

  useEffect(() => {
    if (isCategoriesSuccess && categoriesResp) {
      setCategoriesList(categoriesResp);
      setSelectList(prevSelectList => [...prevSelectList, 'category']);
    }
  }, [isCategoriesSuccess, categoriesResp]);

  const renderSelect = item => {
    let options, onChange, className;

    switch (item) {
      case 'ingredients':
        options = ingredientsList;
        onChange = handleIngredient;
        className = 'ingredients';
        break;
      case 'area':
        options = areasList;
        onChange = handleArea;
        className = 'area';
        break;
      case 'category':
        options = categoriesList;
        onChange = handleCategories;
        className = 'category';
        break;
      default:
        return null;
    }

    return (
      <li key={item}>
        <Select
          options={options}
          onChange={onChange}
          value={item}
          className={className}
        />
      </li>
    );
  };

  return (
    <>
      <ul className={cl.recipeFilters}>
        {selectList.map(item => renderSelect(item))}
      </ul>
    </>
  );
};

RecipeFilters.propTypes = {
  selectList: PropTypes.array,
  handleIngredient: PropTypes.func,
  handleArea: PropTypes.func,
  handleCategories: PropTypes.func,
};

export default RecipeFilters;
