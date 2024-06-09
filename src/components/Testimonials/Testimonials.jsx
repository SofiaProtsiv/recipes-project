import MainTitle from '../ui/MainTitle';
import Subtitle from '../ui/Subtitle/Subtitle';
import TestimonialsSlider from './TestimonialsSlider';
import { BiSolidQuoteLeft } from 'react-icons/bi';
import cl from './testimonials.module.scss';

const Testimonials = () => {
  return (
    <div className={cl.testimonials_wrapper}>
      <div className={cl.testimonials_title_wrapper}>
        <Subtitle>What our customer say</Subtitle>
        <MainTitle>Testimonials</MainTitle>
      </div>
      <div className={cl.quotes_wrapper}>
        <BiSolidQuoteLeft className={cl.quotes} />
      </div>
      <TestimonialsSlider />
    </div>
  );
};

export default Testimonials;
