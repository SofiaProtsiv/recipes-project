import RecipeCard from '../Recipes/RecipeCard/RecipeCard';
import cl from './popularRecipes.module.scss';

const PopularRecipes = () => {
  return (
    <ul className={cl.className}>
      {[].map(id => {
        return <RecipeCard key={id}></RecipeCard>;
      })}
    </ul>
  );
};

export default PopularRecipes;
