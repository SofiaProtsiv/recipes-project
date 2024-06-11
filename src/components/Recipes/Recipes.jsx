import { useEffect, useState } from 'react';
import { recipesApi } from '../../redux/recipes/recipesApi';
import Button from '../ui/Button';
import MainTitle from '../ui/MainTitle';
import Subtitle from '../ui/Subtitle';
import RecipeFilters from './RecipeFilters';
import RecipeList from './RecipeList';
import RecipePagination from './RecipePagination';
import PropTypes from 'prop-types';
import getLimitForViewport from '../../utils/getLimitForViewport';
import cl from './recipes.module.scss';

const Recipes = () => {
  const limit = getLimitForViewport();
  const selectList = ['ingredients', 'area'];
  const [recipeList, setRecipeList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const resp = recipesApi.useGetRecipesQuery({ page, limit });
  useEffect(() => {
    if (resp.status === 'fulfilled') {
      const { recipes, total } = resp.data;
      setRecipeList(recipes);
      setTotal(total);
    }
  }, [resp, page]);

  const handlePage = clickedPage => {
    if (clickedPage > page) {
      setPage(page + 1);
    } else {
      setPage(page - 1);
    }
  };

  const totalPages = Math.ceil(total / limit);
  return (
    <>
      <Button>Back</Button>
      <MainTitle>RecipesTitle</MainTitle>
      <Subtitle>RecipesSubtitle</Subtitle>
      <div className={cl.recipesWrapper}>
        <RecipeFilters selectList={selectList} />
        <div className={cl.recipeListWrapper}>
          <RecipeList recipeList={recipeList} />
          <RecipePagination
            handlePage={handlePage}
            page={page}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
};

Recipes.PropTypes = {
  category: PropTypes.string,
};

export default Recipes;
