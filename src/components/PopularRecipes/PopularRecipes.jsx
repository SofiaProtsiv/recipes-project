import { useFetchCurrentUserQuery } from '../../redux/auth/AuthApi';
import { useGetPopularRecipesQuery } from '../../redux/recipes/recipesApi';
import RecipeCard from '../Recipes/RecipeCard/RecipeCard';
import cl from './popularRecipes.module.scss';

const PopularRecipes = () => {
  const { data: userData } = useFetchCurrentUserQuery();
  const reqData = {
    userId: userData ? userData._id : null,
  };
  const popularRecipes = useGetPopularRecipesQuery(reqData).data?.resipes;
  return (
    <>
      <h2 className={cl.title}>Popular recipes</h2>
      <ul className={cl.list}>
        {popularRecipes &&
          popularRecipes.map(recipe => {
            return <RecipeCard key={recipe._id} recipe={recipe} />;
          })}
      </ul>
    </>
  );
};

export default PopularRecipes;
