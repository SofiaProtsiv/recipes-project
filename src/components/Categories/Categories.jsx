import MainTitle from '../ui/MainTitle';
import Subtitle from '../ui/Subtitle/Subtitle';
import CategoryList from './CategoryList';

const Categories = () => {
  return (
    <>
      <MainTitle>Categories</MainTitle>
      <Subtitle>
        Discover a limitless world of culinary possibilities and enjoy exquisite
        recipes that combine taste, style and the warm atmosphere of the
        kitchen.
      </Subtitle>
      <CategoryList />
    </>
  );
};

export default Categories;
