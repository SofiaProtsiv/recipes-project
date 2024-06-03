import RecipeCard from '../RecipeCard/RecipeCard';
import cl from './recipeList.module.scss';

const RecipeList = () => {
  return (
    <ul className={cl.className}>
      {[].map(id => {
        return <RecipeCard key={id} />;
      })}
    </ul>
  );
};

export default RecipeList;
