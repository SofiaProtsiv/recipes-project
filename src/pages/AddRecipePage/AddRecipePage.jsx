import AddRecipeForm from '../../components/AddRecipeForm';
import PathInfo from '../../components/PathInfo/PathInfo';
import MainTitle from '../../components/ui/MainTitle';
import Subtitle from '../../components/ui/Subtitle/Subtitle';
import cl from './addRecipePage.module.scss';

const AddRecipePage = () => {
  return (
    <div className={cl.section}>
      <div className={cl.container}>
        <PathInfo />
        <MainTitle addClass={cl['custome-title']}>Add recipe</MainTitle>
        <Subtitle>
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </Subtitle>
        <AddRecipeForm />
      </div>
    </div>
  );
};

export default AddRecipePage;
