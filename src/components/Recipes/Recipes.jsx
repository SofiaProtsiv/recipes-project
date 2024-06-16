import { useEffect, useState } from 'react';
import { recipesApi } from '../../redux/recipes/recipesApi';
import RecipeFilters from './RecipeFilters';
import RecipeList from './RecipeList';
import RecipePagination from './RecipePagination';
import PropTypes from 'prop-types';
import getLimitForViewport from '../../utils/getLimitForViewport';
import cl from './recipes.module.scss';
import SkeletonRecipeCard from './RecipeCard/SkeletonRecipeCard';
import { useDispatch, useSelector } from 'react-redux';
import authApi from '../../redux/auth/AuthApi';
import { useParams } from 'react-router-dom';
import scrollUpToSection from '../../utils/scrollUpToSection';
import Subtitle from '../ui/Subtitle';
import ButtonLink from '../ui/ButtonLink';
import MainTitle from '../ui/MainTitle';
import { authSlice } from '../../redux/auth/AuthSlice';

const Recipes = () => {
  const SKELETON_AMOUNT = 6;
  const ALL_CATEGORIES = 'all';
  const limit = getLimitForViewport();
  const { name: category } = useParams();
  const [currentCategory, setCategory] = useState({
    id: '',
    name: ALL_CATEGORIES,
  });
  const [recipeList, setRecipeList] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(1);
  const [ingredients, setIngredient] = useState(null);
  const [area, setArea] = useState(null);
  const isLoggedIn = useSelector(state => state.authSlice.isLoggedIn);
  const { data: userData } = authApi.useFetchCurrentUserQuery();
  const { data, refetch, isFetching, isSuccess, isError } =
    recipesApi.useGetRecipesQuery({
      page,
      limit,
      category: currentCategory ? currentCategory.id : null,
      area,
      ingredients,
      userId: userData?._id,
    });
  const [user, setUser] = useState(null);
  const categories = useSelector(state => state.categoriesSlice.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (category !== ALL_CATEGORIES && categories.length > 0) {
      const currentCategory = categories.find(item => item._id === category);
      setCategory(currentCategory);
    }
  }, [category, categories]);

  useEffect(() => {
    if (isLoggedIn) {
      console.log('user', isLoggedIn);
      setUser(userData);
      dispatch(authSlice.actions.updateUser({ user: userData }));
      refetch();
    }
  }, [userData, isLoggedIn, user, refetch, dispatch]);

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
    category,
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
    if (id === currentCategory.id) {
      setCategory({ id: null, name: ALL_CATEGORIES });
    } else {
      setCategory({ id, name });
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
      <MainTitle>
        {isFetching
          ? 'Loading...'
          : currentCategory
          ? currentCategory.name
          : ALL_CATEGORIES}
      </MainTitle>
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
          category={currentCategory ? currentCategory.name : ALL_CATEGORIES}
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
