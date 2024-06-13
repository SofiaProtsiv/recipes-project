import { useParams } from 'react-router-dom';
import RecipeIngredients from './RecipeIngredients';
import RecipePreparation from './RecipePreparation';
import { useGetRecipeByIdQuery } from '../../redux/recipes/recipesApi';
import cl from './recipeInfo.module.scss';

const RecipeInfo = () => {
  const { recipeId } = useParams();
  const { data: recipe } = useGetRecipeByIdQuery(recipeId);
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
          <div className={cl['owner-container']}>
            <img
              src={recipe?.owner?.avatar}
              alt={recipe?.owner?.name}
              className={cl['owner-image']}
            />
            <p>
              <span className={cl['owner-title']}>Created by:</span>
              <span className={cl['owner-name']}>{recipe?.owner?.name}</span>
            </p>
          </div>
          <RecipeIngredients />
          <RecipePreparation />
        </div>
      </div>
    </>
  );
};

export default RecipeInfo;
