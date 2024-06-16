import { useNavigate, useParams } from 'react-router-dom';
import RecipeIngredients from './RecipeIngredients';
import RecipePreparation from './RecipePreparation';
import { useGetRecipeByIdQuery } from '../../redux/recipes/recipesApi';
import cl from './recipeInfo.module.scss';
import Button from '../ui/Button';
import {
  useAddRecipeToFavoritesListMutation,
  useFetchCurrentUserQuery,
  useRemoveRecipeFromFavoritesListMutation,
} from '../../redux/auth/AuthApi';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const RecipeInfo = () => {
  const { recipeId } = useParams();
  const isLoggedIn = useSelector(state => state.authSlice.isLoggedIn);
  let userData = null;
  if (isLoggedIn) {
    userData = useFetchCurrentUserQuery().data;
  }
  const reqData = {
    id: recipeId,
    userId: userData ? userData._id : null,
  };
  const { data: recipe } = useGetRecipeByIdQuery(reqData);
  const isFavorite = recipe?.isFavorite;

  const [favorite, setFavorite] = useState(isFavorite);

  const [addRecipeToFavoritesList] = useAddRecipeToFavoritesListMutation();
  const [removeRecipeFromFavoritesList] =
    useRemoveRecipeFromFavoritesListMutation();

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const handleFavorite = () => {
    if (!favorite) {
      setFavorite(true);
      addRecipeToFavoritesList(recipeId);
    } else {
      setFavorite(false);
      removeRecipeFromFavoritesList(recipeId);
    }
  };

  const navigate = useNavigate();
  const handleOwnerClick = ownerId => {
    navigate(`/user/${ownerId}`);
  };

  return (
    <>
      <div className={cl.container}>
        <img src={recipe?.thumb} alt={recipe?.title} className={cl.image} />
        <div>
          <h1 className={cl.title}>{recipe?.title}</h1>
          <div className={cl['feature-container']}>
            <p className={cl.feature}>{recipe?.category.name}</p>
            <p className={cl.feature}> {recipe?.time} min</p>
          </div>
          <p className={cl.description}>{recipe?.description}</p>
          <Button onClick={() => handleOwnerClick(recipe?.owner?._id)}>
            <div className={cl['owner-container']}>
              <img
                src={
                  recipe?.owner?.avatar
                    ? recipe?.owner?.avatar
                    : '/images/user/avatar-3814049_640.webp'
                }
                alt={recipe?.owner?.name}
                className={cl['owner-image']}
              />
              <p>
                <span className={cl['owner-title']}>Created by:</span>
                <span className={cl['owner-name']}>{recipe?.owner?.name}</span>
              </p>
            </div>
          </Button>
          <RecipeIngredients />
          <RecipePreparation />
          <Button
            disabled={!isLoggedIn}
            onClick={() => {
              handleFavorite();
            }}
            addClass={isLoggedIn ? `${cl.button}` : `${cl['button-disabled']}`}
          >
            {favorite ? 'REMOVE FROM FAVORITES' : 'ADD TO FAVORITES'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default RecipeInfo;
