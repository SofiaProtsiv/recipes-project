import cl from './recipeFilters.module.scss';
import Select from '../../ui/Select';
import PropTypes from 'prop-types';
import { ingredientsApi } from '../../../redux/ingredients/ingredientsApi';
import { areasApi } from '../../../redux/areas/areasApi';
import { useEffect, useState } from 'react';
import { categoriesApi } from '../../../redux/categories/categoriesApi';
import SkeletonSelect from '../../ui/Select/SkeletonSelect';

const RecipeFilters = ({
  handleIngredient,
  handleArea,
  handleCategories,
  category,
}) => {
  const DEFAULT_CATEGORY = 'category';
  const DEFAULT_AREA = 'area';
  const DEFAULT_INGREDIENTS = 'ingredients';
  const [selectList, setSelectList] = useState([]);
  const [areasList, setAreasList] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [settedCategory, setCategory] = useState('');
  const {
    data: ingredientsResp,
    isFetching: isIngredientsFetching,
    isSuccess: isIngredientsSuccess,
  } = ingredientsApi.useGetIngredientsQuery();
  const {
    data: areasResp,
    isFetching: isAreasFetching,
    isSuccess: isAreasSuccess,
  } = areasApi.useGetAreasQuery();
  const {
    data: categoriesResp,
    isFetching: isCategoriesFetching,
    isSuccess: isCategoriesSuccess,
  } = categoriesApi.useGetCategoriesQuery();
  useEffect(() => {
    if (isIngredientsSuccess && ingredientsResp) {
      setIngredientsList(ingredientsResp);
      setSelectList(prevSelectList => [...prevSelectList, DEFAULT_INGREDIENTS]);
    }
  }, [isIngredientsSuccess, ingredientsResp]);

  useEffect(() => {
    if (isAreasSuccess && areasResp) {
      setAreasList(areasResp);
      setSelectList(prevSelectList => [...prevSelectList, DEFAULT_AREA]);
    }
  }, [isAreasSuccess, areasResp]);

  useEffect(() => {
    if (isCategoriesSuccess && categoriesResp.length > 0) {
      setCategoriesList(categoriesResp);
      setCategory(category === 'all' ? DEFAULT_CATEGORY : category);
      setSelectList(prevSelectList => [
        ...prevSelectList.filter(el => el !== settedCategory),
        settedCategory,
      ]);
    }
  }, [
    isCategoriesSuccess,
    category,
    categoriesResp,
    settedCategory,
    handleCategories,
  ]);

  const renderSelect = item => {
    let options, onChange, className, value, isLoading, isSuccess;

    switch (item) {
      case DEFAULT_INGREDIENTS:
        options = ingredientsList;
        onChange = handleIngredient;
        className = item;
        isLoading = isIngredientsFetching;
        value = item;
        isSuccess = isIngredientsSuccess;
        break;
      case DEFAULT_AREA:
        options = areasList;
        onChange = handleArea;
        className = item;
        isLoading = isAreasFetching;
        value = item;
        isSuccess = isAreasSuccess;
        break;
      case settedCategory:
        options = categoriesList;
        onChange = handleCategories;
        className = item;
        isLoading = isCategoriesFetching;
        value = settedCategory;
        isSuccess = isCategoriesSuccess;
        break;
      default:
        return null;
    }

    return (
      <li key={item}>
        {isLoading ? (
          <SkeletonSelect />
        ) : isSuccess ? (
          <Select
            options={options}
            onChange={onChange}
            className={className}
            value={value}
          />
        ) : null}
      </li>
    );
  };

  return (
    <>
      <ul className={cl.recipeFilters}>
        {isCategoriesFetching || isAreasFetching || isIngredientsFetching ? (
          <SkeletonSelect />
        ) : (
          selectList.map(item => renderSelect(item))
        )}
      </ul>
    </>
  );
};

RecipeFilters.propTypes = {
  selectList: PropTypes.array,
  handleIngredient: PropTypes.func,
  handleArea: PropTypes.func,
  handleCategories: PropTypes.func,
  category: PropTypes.string,
};

export default RecipeFilters;
