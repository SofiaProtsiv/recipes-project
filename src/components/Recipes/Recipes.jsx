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

const Recipes = ({ category = null }) => {
  const limit = getLimitForViewport();
  const selectList = ['ingredients', 'area'];
  const [recipeList, setRecipeList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [ingredient, setIngredient] = useState(null);
  const [area, setArea] = useState(null);
  const recipeResp = recipesApi.useGetRecipesQuery({
    page,
    limit,
    category,
    area,
    ingredient,
  });

  useEffect(() => {
    if (recipeResp.status === 'fulfilled') {
      const { recipes, total } = recipeResp.data;
      setRecipeList(recipes);
      setTotal(total);
    }
  }, [recipeResp, page, area, ingredient]);

  const handlePage = clickedPage => {
    if (clickedPage === page) {
      return;
    }
    if (clickedPage > page) {
      setPage(page + 1);
    } else {
      setPage(page - 1);
    }
  };

  const handleIngredient = id => {
    if (id === ingredient) {
      setIngredient(null);
    } else {
      setIngredient(id);
    }
  };

  const handleArea = id => {
    if (id === area) {
      setArea(null);
    } else {
      setArea(id);
    }
  };
  const totalPages = Math.ceil(total / limit);
  return (
    <>
      <Button>Back</Button>
      <MainTitle>RecipesTitle</MainTitle>
      <Subtitle>RecipesSubtitle</Subtitle>
      <div className={cl.recipesWrapper}>
        <RecipeFilters
          selectList={selectList}
          handleIngredient={handleIngredient}
          handleArea={handleArea}
        />
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
