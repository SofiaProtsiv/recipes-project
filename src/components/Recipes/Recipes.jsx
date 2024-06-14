import { useEffect, useState } from 'react';
import { recipesApi } from '../../redux/recipes/recipesApi';
import RecipeFilters from './RecipeFilters';
import RecipeList from './RecipeList';
import RecipePagination from './RecipePagination';
import PropTypes from 'prop-types';
import getLimitForViewport from '../../utils/getLimitForViewport';
import cl from './recipes.module.scss';
import SkeletonRecipeCard from './RecipeCard/SkeletonRecipeCard';
import { useSelector } from 'react-redux';
import authApi from '../../redux/auth/AuthApi';
import { useParams } from 'react-router-dom';

const Recipes = () => {
  const limit = getLimitForViewport();
  const { name: category } = useParams();
  const [categoryState, setCategory] = useState(null);
  const [recipeList, setRecipeList] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(1);
  const [ingredients, setIngredient] = useState(null);
  const [area, setArea] = useState(null);
  const isLoggedIn = useSelector(state => state.authSlice.isLoggedIn);
  const { data: userData } = authApi.useFetchCurrentUserQuery();
  const { data, isFetching, isSuccess, isError, error } =
    recipesApi.useGetRecipesQuery({
      page,
      limit,
      category: categoryState,
      area,
      ingredients,
      userId: userData?._id,
    });
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!(category === 'all')) {
      setCategory(category);
    }
  }, [category]);

  useEffect(() => {
    if (isLoggedIn) {
      setUser(userData);
    }
  }, [userData, isLoggedIn, user]);

  useEffect(() => {
    if (isSuccess && data) {
      const { recipes, total } = data;
      setRecipeList(recipes);
      setTotalElements(total);
    }
  }, [
    isSuccess,
    isError,
    isFetching,
    data,
    recipeList,
    page,
    area,
    ingredients,
    categoryState,
  ]);

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

  const handleIngredient = ({ _id: id }) => {
    if (id === ingredients) {
      setIngredient(null);
    } else {
      setIngredient(id);
    }
  };

  const handleCategories = ({ _id: id }) => {
    if (id === categoryState) {
      setCategory(null);
    } else {
      setCategory(id);
    }
  };

  const handleArea = ({ _id: id }) => {
    if (id === area) {
      setArea(null);
    } else {
      setArea(id);
    }
  };

  const totalPages = Math.ceil(totalElements / limit);
  return (
    <>
      <div className={cl.recipesWrapper}>
        <RecipeFilters
          handleIngredient={handleIngredient}
          handleArea={handleArea}
          handleCategories={handleCategories}
          category={category}
        />
        <div className={cl.recipeListWrapper}>
          {isFetching ? (
            <SkeletonRecipeCard />
          ) : isError ? (
            <p className={cl.error}>{error.data['message']}</p>
          ) : (
            <>
              <RecipeList recipeList={recipeList} />
              <RecipePagination
                handlePage={handlePage}
                page={page}
                totalPages={totalPages}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

Recipes.propTypes = {
  category: PropTypes.string,
};

export default Recipes;
