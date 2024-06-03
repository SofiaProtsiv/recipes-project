import cl from './categoryList.module.scss';

const CategoryList = () => {
  return (
    <ul className={cl.className}>
      {[].map(id => {
        return <li key={id}></li>;
      })}
    </ul>
  );
};

export default CategoryList;
