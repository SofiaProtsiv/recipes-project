import cl from './listItems.module.scss';
import RecipePreview from './RecipePreview/RecipePreview';
import UserCard from './UserCard/UserCard';
import PropTypes from 'prop-types';
import UserCardSkeleton from './UserCard/UserCardSkeleton';
import RecipePreviewSkeleton from './RecipePreview/RecipePreviewSkeleton';
const TypeOfCard = {
  UserCard: 'UseCard',
  RecipeCard: 'RecipeCard',
};
const skeleton = [1, 2, 3, 4, 5, 6, 7, ];
const ListItems = ({ data = [], isLoading, typeOfCard = '' }) => {
  if (isLoading) {
    return (
      <div className={cl.listWrapper}>
        {typeOfCard === TypeOfCard.RecipeCard
          ? skeleton.map((_, index) => <RecipePreviewSkeleton key={index} />)
          : skeleton.map((_, index) => <UserCardSkeleton key={index} />)}
      </div>
    );
  }
  return (
    <ul className={cl.listWrapper}>
      {data.map(cardData => {
        return typeOfCard === TypeOfCard.RecipeCard ? (
          <RecipePreview isLoading={isLoading} cardData={cardData} />
        ) : (
          <UserCard isLoading={isLoading} cardData={cardData} />
        );
      })}
    </ul>
  );
};
ListItems.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  typeOfCard: PropTypes.oneOf(Object.values(TypeOfCard)),
};

export default ListItems;
