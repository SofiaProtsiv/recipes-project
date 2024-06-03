import AddRecipeForm from '../../components/AddRecipeForm';
import PathInfo from '../../components/PathInfo/PathInfo';
import MainTitle from '../../components/ui/MainTitle';
import Subtitle from '../../components/ui/Subtitle/Subtitle';

const AddRecipePage = () => {
  return (
    <>
      <PathInfo />
      <MainTitle>Add recipe</MainTitle>
      <Subtitle>
        Reveal your culinary art, share your favorite recipe and create
        gastronomic masterpieces with us.
      </Subtitle>
      <AddRecipeForm />
    </>
  );
};

export default AddRecipePage;
