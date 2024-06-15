import PathInfo from '../../components/PathInfo/PathInfo';
import TabsList from '../../components/TabsList';
import Button from '../../components/ui/Button';
import MainTitle from '../../components/ui/MainTitle';
import Subtitle from '../../components/ui/Subtitle/Subtitle';
import { useDispatch, useSelector } from 'react-redux';
import {
  useFetchCurrentUserQuery,
  useGetUserByIdQuery,
} from '../../redux/auth/AuthApi.jsx';
import { useEffect } from 'react';
import { logOutUser, setUserId } from '../../redux/auth/AuthSlice.jsx';
import cl from './userPage.module.scss';

const UserPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authSlice.user);
  const token = useSelector(state => state.authSlice.token);
  console.log('token', token);

  const {
    data: currentUser,
    error: currentUserError,
    isLoading: isLoadingCurrentUser,
  } = useFetchCurrentUserQuery(undefined, { skip: !token });

  useEffect(() => {
    if (currentUser && currentUser._id) {
      dispatch(setUserId({ _id: currentUser._id }));
    }
  }, [currentUser, dispatch]);

  const {
    data: userData,
    error,
    isLoading,
  } = useGetUserByIdQuery(user._id, {
    skip: !user._id,
  });

  const handleLogOut = async () => {
    dispatch(logOutUser());
  };

  if (isLoading || isLoadingCurrentUser) return <div>Loading user data...</div>;
  if (error || currentUserError)
    return <div>Error: {error?.message || currentUserError?.message}</div>;

  return (
    <>
      <PathInfo />
      <MainTitle>Profile</MainTitle>
      <Subtitle>
        Reveal your culinary art, share your favorite recipe and create
        gastronomic masterpieces with us.
      </Subtitle>

      <div className={cl.userWrap}>
        {userData && (
          <div className={cl.userInfo}>
            <img
              className={cl.userInfoImage}
              src={userData?.avatar}
              alt={`${userData?.name}'s avatar`}
            />
            <h1>{userData?.name}</h1>
            <p className={cl.userInfoText}>
              Email: <span className={cl.userInfoSpan}>{userData?.email}</span>
            </p>
            <p className={cl.userInfoText}>
              Added recipes:{' '}
              <span className={cl.userInfoSpan}>{userData?.recipesQty}</span>{' '}
            </p>
            <p className={cl.userInfoText}>
              Favorites:{' '}
              <span className={cl.userInfoSpan}>{userData?.favRecipesQty}</span>{' '}
            </p>
            <p className={cl.userInfoText}>
              Followers:{' '}
              <span className={cl.userInfoSpan}>{userData?.followersQty}</span>{' '}
            </p>
            <p className={cl.userInfoText}>
              Following:{' '}
              <span className={cl.userInfoSpan}>{userData?.followingQty}</span>{' '}
            </p>
          </div>
        )}
        <Button addClass={cl.logoutBtn} onClick={handleLogOut}>
          Log out
        </Button>
      </div>

      <TabsList />
    </>
  );
};

export default UserPage;
