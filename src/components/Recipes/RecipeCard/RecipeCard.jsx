import cl from './recipeCard.module.scss';
import PropTypes from 'prop-types';

const RecipeCard = ({ recipe }) => {
  return (
    <>
      <li className={cl.recipeItem}>
        <img
          src={recipe.thumb}
          alt={recipe.title}
          className={`${cl.recipeImg} ${cl.skeleton}`}
        ></img>
        <h3 className={cl.recipeTitle}>{recipe.title} </h3>
        <p className={cl.recipeText}>{recipe.instructions}</p>
      </li>
    </>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    thumb: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeCard;
