import Button from '../ui/Button';
import cl from './hero.module.scss';

const Hero = () => {
  return (
    <section className={cl.section}>
      <h1 className={cl.title}>Improve Your<br/>Culinary Talents</h1>
      <p className={cl.desc}>
        Amazing recipes for beginners in the world of cooking, enveloping you in
        the aromas and tastes of various cuisines.
      </p>
      <Button className={cl.button}>Add Recipe</Button>
      <div className={cl.imgContainer}>
        <img src="/public/images/categories/Breakfast.jpg" alt="" />
        <img src="/public/images/categories/Beef.jpg" alt="" />
      </div>
    </section>
  );
};

export default Hero;
