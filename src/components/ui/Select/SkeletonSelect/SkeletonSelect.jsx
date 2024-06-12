import cl from './skeletonSelect.module.scss';

const SkeletonSelect = () => {
  return (
    <div className={`${cl.selectWrapper} ${cl.skeleton}`}>
      <button className={cl.selectButton} disabled>
        <span className={`${cl.selectValue} ${cl.skeletonText}`}>Loading</span>
        <span className={cl.arrow}></span>
      </button>
    </div>
  );
};

export default SkeletonSelect;
