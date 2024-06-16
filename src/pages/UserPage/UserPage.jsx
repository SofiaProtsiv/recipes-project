import PathInfo from '../../components/PathInfo/PathInfo';
import TabsList from '../../components/TabsList';
import Button from '../../components/ui/Button';
import MainTitle from '../../components/ui/MainTitle';
import Subtitle from '../../components/ui/Subtitle/Subtitle';
import { useDispatch, useSelector } from 'react-redux';
import {
  useFetchCurrentUserQuery,
  useGetUserByIdQuery,
  useUpdateAvatarMutation,
} from '../../redux/auth/AuthApi.jsx';
import { useEffect, useRef } from 'react';
import {
  logOutUser,
  setUserId,
  updateUserAvatar,
} from '../../redux/auth/AuthSlice.jsx';
import cl from './userPage.module.scss';
import Icon from '../../components/ui/Icon/index.js';

const UserPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authSlice.user);
  const token = useSelector(state => state.authSlice.token);
  const [updateAvatar] = useUpdateAvatarMutation();
  const fileInputRef = useRef(null);

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

  const handleFileChange = async event => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const result = await updateAvatar({ formData, token }).unwrap();
        dispatch(updateUserAvatar({ data: result }));
      } catch (error) {
        console.error('Failed to update avatar:', error);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

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
            <Button addClass={cl.plusBtn} onClick={handleClick}>
              <Icon icon="whitePlus" />
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            <h1>{userData?.name}</h1>
            <div className={cl.userTextWrap}>
              <p className={cl.userInfoText}>
                Email:{' '}
                <span className={cl.userInfoSpan}>{userData?.email}</span>
              </p>
              <p className={cl.userInfoText}>
                Added recipes:{' '}
                <span className={cl.userInfoSpan}>{userData?.recipesQty}</span>{' '}
              </p>
              <p className={cl.userInfoText}>
                Favorites:{' '}
                <span className={cl.userInfoSpan}>
                  {userData?.favRecipesQty}
                </span>{' '}
              </p>
              <p className={cl.userInfoText}>
                Followers:{' '}
                <span className={cl.userInfoSpan}>
                  {userData?.followersQty}
                </span>{' '}
              </p>
              <p className={cl.userInfoText}>
                Following:{' '}
                <span className={cl.userInfoSpan}>
                  {userData?.followingQty}
                </span>{' '}
              </p>
            </div>
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
