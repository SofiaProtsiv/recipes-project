import PathInfo from '../../components/PathInfo/PathInfo';
import PopularRecipes from '../../components/PopularRecipes';
import RecipeInfo from '../../components/RecipeInfo/RecipeInfo';
import cl from './recipePage.module.scss';

const RecipePage = () => {
  return (
    <div className={cl.container}>
      <PathInfo />
      <RecipeInfo />
      <PopularRecipes />
    </div>
  );
};

export default RecipePage;
