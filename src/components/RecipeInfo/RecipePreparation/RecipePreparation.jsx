import { useParams } from 'react-router-dom';
import cl from './recipePreparation.module.scss';
import { useGetRecipeByIdQuery } from '../../../redux/recipes/recipesApi';
import Button from '../../ui/Button';
import { useAddRecipeToFavoritesListMutation } from '../../../redux/auth/AuthApi';

const RecipePreparation = () => {
  const { recipeId } = useParams();

  const [addRecipeToFavoritesList] = useAddRecipeToFavoritesListMutation();

  const { data: recipe } = useGetRecipeByIdQuery(recipeId);
  const textParagraph = recipe?.instructions
    ? recipe.instructions.split('\n')
    : [];
  return (
    <div className={cl['prep-container']}>
      <h2 className={cl.title}>Recipe Preparation</h2>
      {textParagraph.map((paragraph, index) => (
        <p key={index} className={cl.text}>
          {paragraph}
        </p>
      ))}
      <Button
        onClick={() => addRecipeToFavoritesList(recipeId)}
        addClass={cl.button}
      >
        ADD TO FAVORITES
      </Button>
    </div>
  );
};

export default RecipePreparation;
