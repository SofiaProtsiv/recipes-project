import ButtonLink from '../../../ui/ButtonLink';
import cl from './recipeExtra.module.scss';
import PropTypes from 'prop-types';
import user from '../../../../assets/constants/user';
import ButtonIcon from '../../../ui/ButtonIcon';
import authApi from '../../../../redux/auth/AuthApi';
import { useState } from 'react';

const RecipeExtra = ({
  owner: { _id, name, avatar },
  recipeId,
  isFavorite = false,
}) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [addRecipeToFavoritesList] =
    authApi.useAddRecipeToFavoritesListMutation();
  const [removeRecipeFromFavoritesList] =
    authApi.useRemoveRecipeFromFavoritesListMutation();

  const handleFavorite = () => {
    if (!favorite) {
      setFavorite(true);
      addRecipeToFavoritesList(recipeId);
    } else {
      setFavorite(false);
      removeRecipeFromFavoritesList(recipeId);
    }
  };
  return (
    <div className={cl.recipeExtra}>
      <div className={cl.recipeOwner}>
        <ButtonLink to={`/user/${_id}`} addClass={cl.recipeOwner}>
          <img
            className={`${cl.recipeOwnerImg} ${cl.skeleton}`}
            src={avatar ? avatar : user.DEFAULT_AVATAR}
            alt={name}
          />
        </ButtonLink>
        <h4 className={cl.recipeOwnerName}>{name}</h4>
      </div>
      <div className={cl.recipeButtons} data-id={recipeId}>
        <ButtonIcon
          icon="heart"
          addClass={`${favorite ? 'active' : ''}`}
          onClick={handleFavorite}
        ></ButtonIcon>
        <ButtonLink
          to={`/recipe/${recipeId}`}
          icon="arrow_up_right"
          addClass={cl.recipeLink}
        ></ButtonLink>
      </div>
    </div>
  );
};

RecipeExtra.propTypes = {
  owner: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
  recipeId: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool,
  url: PropTypes.string,
};

export default RecipeExtra;
