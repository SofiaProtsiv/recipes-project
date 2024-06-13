import cl from './userCard.module.scss';
import Button from '../../ui/Button';
import ButtonLink from '../../ui/ButtonLink';
import { useRemoveUserFromFollowingListMutation } from '../../../redux/auth/AuthApi';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const UserCard = ({ cardData }) => {
  const [removeUserFromFollowingList, { isLoading: isRemoving }] =
    useRemoveUserFromFollowingListMutation();

  const removeUserHandler = async id => {
    await removeUserFromFollowingList(id);
  };

  return (
    <li className={cl.cardContainer}>
      <div className={cl.cardWrapper}>
        <Link to={`user/${cardData._id}`}>
          <img
            src={cardData.avatar}
            alt={cardData.name}
            className={cl.cardImage}
          />
        </Link>

        <div>
          <h3 className={cl.cardTitle}>{cardData.name}</h3>
          <p className={cl.cardText}>Own recipes: {cardData.recipesCount}</p>

          <Button onClick={() => removeUserHandler(cardData._id)}>
            {isRemoving ? 'loading' : 'Unfollow'}
          </Button>
        </div>
        <ul className={cl.listRecipes}>
          {cardData.recipes.slice(0, 3).map(recipe => {
            return (
              <li key={recipe._id}>
                <img src={recipe.thumb} alt={recipe.title} />
              </li>
            );
          })}
        </ul>
      </div>
      <ButtonLink
        icon="arrow_up_right"
        to={`user/${cardData._id}`}
      ></ButtonLink>
    </li>
  );
};

UserCard.propTypes = {
  cardData: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    recipesCount: PropTypes.number.isRequired,
    recipes: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        thumb: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
export default UserCard;
