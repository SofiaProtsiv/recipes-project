import cl from './recipePreview.module.scss';
import { useRemoveRecipeFromFavoritesListMutation } from '../../../redux/auth/AuthApi';
import ButtonIcon from '../../ui/ButtonIcon';
import ButtonLink from '../../ui/ButtonLink';
import PropTypes from 'prop-types';
const RecipePreview = ({ cardData }) => {
  const [removeRecipeFromFavoritesList] =
    useRemoveRecipeFromFavoritesListMutation();
  const removeRecipeHandler = id => {
    removeRecipeFromFavoritesList(id);
  };

  return (
    <li className={cl.cardContainer}>
      <div className={cl.cardWrapper}>
        <img
          src={cardData.thumb}
          alt={cardData.title}
          className={cl.cardImage}
        />
        <div>
          <h3 className={cl.cardTitle}>{cardData.title}</h3>
          <p className={cl.cardText}>{cardData.instructions}</p>
        </div>
      </div>
      <ul className={cl.listButton}>
        <li>
          <ButtonLink
            icon="arrow_up_right"
            to={`recipe/${cardData._id}`}
          ></ButtonLink>
        </li>
        <li>
          <ButtonIcon
            onClick={() => removeRecipeHandler(cardData._id)}
            icon="trash"
          ></ButtonIcon>
        </li>
      </ul>
    </li>
  );
};

RecipePreview.propTypes = {
  cardData: PropTypes.shape({
    thumb: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default RecipePreview;
