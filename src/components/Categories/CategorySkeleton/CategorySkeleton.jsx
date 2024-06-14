import cl from './categorySkeleton.module.scss';

const CategoryItem = ({ isWide }) => {
  return (
    <>
      <li
        className={`
          ${cl['category-skeleton']}
          ${isWide ? cl.wide : ''}
        `}
      >
        <div className={cl.content}>
          <div className={cl.pill} />
          <div className={cl.circle} />
        </div>
      </li>
    </>
  );
};

export default CategoryItem;
