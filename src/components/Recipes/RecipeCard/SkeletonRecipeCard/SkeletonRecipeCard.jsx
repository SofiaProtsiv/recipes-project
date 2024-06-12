import cl from './skeletonRecipeCard.module.scss';

const SkeletonRecipeCard = () => {
  return (
    <>
      <li className={cl.recipeItem}>
        <div className={`${cl.recipeImg} ${cl.skeleton}`}></div>
        <div className={cl.recipeTitle}>
          <div className={`${cl.skeleton} ${cl.skeletonText}`}></div>
        </div>
        <div className={cl.recipeText}>
          <div className={`${cl.skeleton} ${cl.skeletonText}`}></div>
          <div className={`${cl.skeleton} ${cl.skeletonText}`}></div>
        </div>
        <div className={cl.recipeAdd}>
          <div className={`${cl.skeleton} ${cl.skeletonText}`}></div>
        </div>
      </li>
    </>
  );
};

export default SkeletonRecipeCard;
