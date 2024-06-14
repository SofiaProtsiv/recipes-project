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
  const [selectList, setSelectList] = useState([]);
  const [areasList, setAreasList] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [settedCategory, setCategory] = useState('category');
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
      setSelectList(prevSelectList => [...prevSelectList, 'ingredients']);
    }
  }, [isIngredientsSuccess, ingredientsResp]);

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
      if (category) {
        const { name } = categoriesResp.filter(
          elem => elem._id === category
        )[0];
        setCategory(name);
      }
    }
  }, [isCategoriesSuccess, category, categoriesResp]);

  const renderSelect = item => {
    let options, onChange, className, isLoading;

    switch (item) {
      case 'ingredients':
        options = ingredientsList;
        onChange = handleIngredient;
        className = 'ingredients';
        isLoading = isIngredientsFetching;
        break;
      case 'area':
        options = areasList;
        onChange = handleArea;
        className = 'area';
        isLoading = isAreasFetching;
        break;
      case 'category':
        options = categoriesList;
        onChange = handleCategories;
        className = 'category';
        isLoading = isCategoriesFetching;
        break;
      default:
        return null;
    }

    return (
      <li key={item}>
        {isLoading ? (
          <SkeletonSelect />
        ) : (
          <Select
            options={options}
            onChange={onChange}
            value={
              settedCategory && item === 'category' ? settedCategory : item
            }
            className={className}
          />
        )}
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
