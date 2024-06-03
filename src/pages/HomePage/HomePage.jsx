import Categories from '../../components/Categories';
import Hero from '../../components/Hero';
import Recipes from '../../components/Recipes';
import Testimonials from '../../components/Testimonials';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Categories />
      <Recipes />
      <Testimonials />
    </>
  );
};

export default HomePage;
