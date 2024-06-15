import { useNavigate, useParams } from 'react-router-dom';
import RecipeIngredients from './RecipeIngredients';
import RecipePreparation from './RecipePreparation';
import { useGetRecipeByIdQuery } from '../../redux/recipes/recipesApi';
import cl from './recipeInfo.module.scss';
import Button from '../ui/Button';

const RecipeInfo = () => {
  const { recipeId } = useParams();
  const { data: recipe } = useGetRecipeByIdQuery(recipeId);
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
                    : '/images/recipe/avatar-3814049_640.webp'
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
        </div>
      </div>
    </>
  );
};

export default RecipeInfo;
