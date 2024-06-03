import PathInfo from '../../components/PathInfo/PathInfo';
import PopularRecipes from '../../components/PopularRecipes';
import RecipeInfo from '../../components/RecipeInfo/RecipeInfo';

const RecipePage = () => {
  return (
    <>
      <PathInfo />
      <RecipeInfo />
      <PopularRecipes />
    </>
  );
};

export default RecipePage;
