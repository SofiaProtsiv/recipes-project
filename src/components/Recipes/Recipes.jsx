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
import scrollUpToSection from '../../utils/scrollUpToSection';
import Subtitle from '../ui/Subtitle';
import ButtonLink from '../ui/ButtonLink';
import MainTitle from '../ui/MainTitle';

const Recipes = () => {
  const SKELETON_AMOUNT = 6;
  const ALL_RECIPES = 'all';
  const limit = getLimitForViewport();
  const { name: category } = useParams();
  const [categoryState, setCategory] = useState(null);
  const [recipeList, setRecipeList] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(1);
  const [ingredients, setIngredient] = useState(null);
  const [area, setArea] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const isLoggedIn = useSelector(state => state.authSlice.isLoggedIn);
  const { data: userData } = authApi.useFetchCurrentUserQuery();
  const { data, isFetching, isSuccess, isError } =
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
    if (category !== ALL_RECIPES) {
      setCategory(category);
    }
    setCategoryName(ALL_RECIPES);
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
      if (categoryName !== ALL_RECIPES && recipes.length > 0) {
        const { category } = recipes[0];
        setCategoryName(category.name);
      }
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
    category,
    categoryName,
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

    scrollUpToSection('#recipes');
  };

  const handleIngredient = ({ _id: id }) => {
    if (id === ingredients) {
      setIngredient(null);
    } else {
      setIngredient(id);
    }
  };

  const handleCategories = ({ _id: id, name }) => {
    if (id === categoryState) {
      setCategory(null);
      setCategoryName(ALL_RECIPES);
    } else {
      setCategory(id);
      setCategoryName(name);
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
      <ButtonLink icon="arrow-back" addClass={cl.recipeBack} to={'/'}>
        <span>Back</span>
      </ButtonLink>
      <MainTitle>{isFetching ? 'Loading...' : categoryName}</MainTitle>
      <Subtitle>
        Go on a taste journey, where every sip is a sophisticated creative
        chord, and every dessert is an expression of the most refined
        gastronomic desires.
      </Subtitle>
      <div className={cl.recipesWrapper} id="recipes">
        <RecipeFilters
          handleIngredient={handleIngredient}
          handleArea={handleArea}
          handleCategories={handleCategories}
          category={categoryState}
        />
        {isFetching ? (
          <ul className={cl.skeletonList}>
            {[...new Array(SKELETON_AMOUNT)].map((_, i) => (
              <SkeletonRecipeCard key={i} />
            ))}
          </ul>
        ) : isError || recipeList.length === 0 ? (
          <p className={cl.error}>{'No recipies found'}</p>
        ) : (
          <div className={cl.recipesContainer}>
            <RecipeList recipeList={recipeList} />
            <RecipePagination
              handlePage={handlePage}
              page={page}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>
    </>
  );
};

Recipes.propTypes = {
  category: PropTypes.string,
};

export default Recipes;
