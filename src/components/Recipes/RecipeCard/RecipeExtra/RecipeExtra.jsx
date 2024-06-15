import cl from './recipeExtra.module.scss';
import PropTypes from 'prop-types';

const RecipeExtra = ({ owner: { _id, name, avatar }, isFavorite = false }) => {
  const defaultAvatar = '/images/recipe/avatar-3814049_640.webp';
  return (
    <div className={cl.recipeExtra}>
      <div className={cl.recipeOwner} data-id={_id}>
        <img
          className={cl.recipeOwnerImg}
          src={avatar ? avatar : defaultAvatar}
          alt={name}
        ></img>
        <h4 className={cl.recipeOwnerName}>{name}</h4>
      </div>
      <div className={cl.recipeButtons}>
        <div className={isFavorite ? `${cl.active}` : ''}>
          <svg className={cl.recipeFavorite}>
            <use href="/symbols.svg#icon-heart"></use>
          </svg>
        </div>
        <div>
          <svg className={cl.recipeLink}>
            <use href="/symbols.svg#icon-arrow-up-right"></use>
          </svg>
        </div>
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
  isFavorite: PropTypes.bool,
  url: PropTypes.string,
};

export default RecipeExtra;
