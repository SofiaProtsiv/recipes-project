import Button from '../ui/Button';
import MainTitle from '../ui/MainTitle';
import Subtitle from '../ui/Subtitle';
import RecipeFilters from './RecipeFilters';
import RecipeList from './RecipeList';
import RecipePagination from './RecipePagination';

const Recipes = () => {
  return (
    <>
      <Button>Back</Button>
      <MainTitle>RecipesTitle</MainTitle>
      <Subtitle>RecipesSubtitle</Subtitle>
      <RecipeFilters />
      <RecipeList />
      <RecipePagination />
    </>
  );
};

export default Recipes;
