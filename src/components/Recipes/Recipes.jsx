import { useEffect, useState } from 'react';
import { recipesApi } from '../../redux/recipes/recipesApi';
import Button from '../ui/Button';
import MainTitle from '../ui/MainTitle';
import Subtitle from '../ui/Subtitle';
import RecipeFilters from './RecipeFilters';
import RecipeList from './RecipeList';
import RecipePagination from './RecipePagination';
import PropTypes from 'prop-types';

const Recipes = () => {
  const limit = getLimitForViewport();
  const selectList = ['ingredients', 'area'];
  const [recipeList, setRecipeList] = useState([]);
  const [page, setPage] = useState(1);
  const recipes = recipesApi.useGetRecipesQuery(page, limit);
  useEffect(() => {
    if (recipes.status === 'fulfilled') {
      setRecipeList(recipes.data);
    }
  }, [recipes, page]);

  const handlePage = direction => {
    if (direction === 'next') {
      setPage(page + 1);
    } else {
      setPage(page - 1);
    }
  };
  return (
    <>
      <Button>Back</Button>
      <MainTitle>RecipesTitle</MainTitle>
      <Subtitle>RecipesSubtitle</Subtitle>
      <RecipeFilters selectList={selectList} />
      <RecipeList recipeList={recipeList} />
      <RecipePagination handlePage={handlePage} page={page} />
    </>
  );
};

Recipes.PropTypes = {
  category: PropTypes.string,
};

const getLimitForViewport = () => {
  const isMobile = window.innerWidth < 768;
  return isMobile ? 8 : 12;
};

export default Recipes;
