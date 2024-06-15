import { useGetPopularRecipesQuery } from '../../redux/recipes/recipesApi';
import RecipeCard from '../Recipes/RecipeCard/RecipeCard';
import cl from './popularRecipes.module.scss';

const PopularRecipes = () => {
  const { data: popularRecipes } = useGetPopularRecipesQuery();
  return (
    <>
      <h2 className={cl.title}>Popular recipes</h2>
      <ul className={cl.list}>
        {popularRecipes?.resipes &&
          popularRecipes.resipes.map(recipe => {
            return <RecipeCard key={recipe._id} recipe={recipe} />;
          })}
      </ul>
    </>
  );
};

export default PopularRecipes;
