import cl from './testimonialsSlider.module.scss';

const Testimonials = () => {
  return (
    <div className={cl.testimonials_wrapper}>
      {/* Just for defaukt */}
      <p className={cl.testimonials_text}>
        Thank you for the wonderful recipe for feta pasta with tomatoes and
        basil. It turned out to be not only tasty, but also incredibly colorful.
        This has become a favorite family meal!
      </p>

      <h4 className={cl.testimonials_name}>Larry Pageim</h4>
    </div>
  );
};

export default Testimonials;
