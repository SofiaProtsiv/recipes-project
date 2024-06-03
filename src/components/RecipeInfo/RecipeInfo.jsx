import RecipeIngredients from './RecipeIngredients';
import RecipeMainInfo from './RecipeMainInfo';
import RecipePreparation from './RecipePreparation';

const RecipeInfo = () => {
  return (
    <>
      <RecipeMainInfo />
      <RecipeIngredients />
      <RecipePreparation />
    </>
  );
};

export default RecipeInfo;
