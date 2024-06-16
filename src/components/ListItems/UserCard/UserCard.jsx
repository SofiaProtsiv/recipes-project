import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  useRemoveUserFromFollowingListMutation,
  useAddUserToFollowingListMutation,
} from '../../../redux/auth/AuthApi';
import { TypeOfList } from '../constants';

import cl from './userCard.module.scss';
import Button from '../../ui/Button';
import ButtonLink from '../../ui/ButtonLink';
// import { useSelector } from 'react-redux';
// import { useState } from 'react';

const defaultAvatar = '/images/recipe/avatar-3814049_640.webp';

const UserCard = ({ cardData, typeOfList }) => {
  // const token = useSelector(state => state.authSlice.token);
  // const [isRemoving, setIsRemoving] = useState(false);
  // const [unfollowUser] = useRemoveUserFromFollowingListMutation();

  const [removeUserFromFollowingList, { isLoading: isRemoving }] =
    useRemoveUserFromFollowingListMutation();

  const [addUserToFollowingList, { isLoading: isAdding }] =
    useAddUserToFollowingListMutation();

  const removeUserHandler = async id => {
    await removeUserFromFollowingList(id);
    // setIsRemoving(true);
    // try {
    //   await unfollowUser({ id, token }).unwrap();
    // } catch (error) {
    //   console.error('Failed to unfollow user:', error);
    // } finally {
    //   setIsRemoving(false);
    // }
  };
  const addUserHandler = async id => {
    await addUserToFollowingList(id);
  };

  return (
    <li className={cl.cardContainer}>
      <div className={cl.cardWrapper}>
        <Link to={`user/${cardData._id}`}>
          <img
            src={cardData.avatar ? cardData.avatar : defaultAvatar}
            alt={cardData.name}
            className={cl.cardImage}
          />
        </Link>
        <div>
          <h3 className={cl.cardTitle}>{cardData.name}</h3>
          <p className={cl.cardText}>Own recipes: {cardData.recipesCount}</p>
          {typeOfList === TypeOfList.Following ? (
            <Button
              addClass={
                isRemoving
                  ? `${cl.skeleton} ${cl.cardButtonUnFollow}`
                  : `${cl.cardButtonUnFollow}`
              }
              onClick={() => removeUserHandler(cardData._id)}
            >
              {isRemoving ? 'Loading' : 'Unfollow'}
            </Button>
          ) : (
            <Button
              addClass={
                isAdding
                  ? `${cl.skeleton} ${cl.cardButtonUnFollow}`
                  : `${cl.cardButtonUnFollow}`
              }
              onClick={() => addUserHandler(cardData._id)}
            >
              {isAdding ? 'Loading' : 'Follow'}
            </Button>
          )}
          {/*{typeOfList === TypeOfList.Followers ? (*/}
          {/*  cardData.isFollowing ? (*/}
          {/*    <Button*/}
          {/*      addClass={*/}
          {/*        isRemoving*/}
          {/*          ? `${cl.skeleton} ${cl.cardButtonUnFollow}`*/}
          {/*          : `${cl.cardButtonUnFollow}`*/}
          {/*      }*/}
          {/*      onClick={() => removeUserHandler(cardData._id)}*/}
          {/*    >*/}
          {/*      {isRemoving ? 'Loading' : 'Following'}*/}
          {/*    </Button>*/}
          {/*  ) : (*/}
          {/*    <Button*/}
          {/*      addClass={*/}
          {/*        isAdding*/}
          {/*          ? `${cl.skeleton} ${cl.cardButtonFollow}`*/}
          {/*          : `${cl.cardButtonFollow}`*/}
          {/*      }*/}
          {/*      onClick={() => addUserHandler(cardData._id)}*/}
          {/*    >*/}
          {/*      {isAdding ? 'Loading' : 'Follow'}*/}
          {/*    </Button>*/}
          {/*  )*/}
          {/*) : (*/}
          {/*  <Button*/}
          {/*    addClass={*/}
          {/*      isRemoving*/}
          {/*        ? `${cl.skeleton} ${cl.cardButtonUnFollow}`*/}
          {/*        : `${cl.cardButtonUnFollow}`*/}
          {/*    }*/}
          {/*    onClick={() => removeUserHandler(cardData._id)}*/}
          {/*  >*/}
          {/*    {isRemoving ? 'Loading' : 'Following'}*/}
          {/*  </Button>*/}
          {/*)}*/}
        </div>
        <ul className={cl.listRecipes}>
          {cardData.recipes.slice(0, 3).map((recipe, index) => {
            return (
              <li key={index}>
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
  typeOfList: PropTypes.oneOf(Object.values(TypeOfList)),
};
export default UserCard;
