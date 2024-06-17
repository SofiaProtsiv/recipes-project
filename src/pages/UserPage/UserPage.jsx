import PathInfo from '../../components/PathInfo/PathInfo';
import TabsList from '../../components/TabsList';
import Button from '../../components/ui/Button';
import MainTitle from '../../components/ui/MainTitle';
import Subtitle from '../../components/ui/Subtitle/Subtitle';
import { useDispatch, useSelector } from 'react-redux';
import {
  useFetchCurrentUserQuery,
  useGetFavoriteRecipesListQuery,
  useGetFollowersQuery,
  useGetFollowingsQuery,
  useGetUserByIdQuery,
  useUpdateAvatarMutation,
} from '../../redux/auth/AuthApi.jsx';
import { useEffect, useRef, useState } from 'react';
import { updateUserAvatar } from '../../redux/auth/AuthSlice.jsx';
import cl from './userPage.module.scss';
import Icon from '../../components/ui/Icon/index.js';
import LogOutModal from '../../components/LogOutModal/index.js';
import Container from '../../components/ui/Container/index.js';
import ListItems from '../../components/ListItems/index.js';
import { useGetOwnRecipesQuery } from '../../redux/recipes/recipesApi.jsx';
import { useParams } from 'react-router-dom';
import useScrollToTop from '../../utils/scrollToTop';

const UserPage = () => {
  useScrollToTop();
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.authSlice.user);
  const [updateAvatar] = useUpdateAvatarMutation();
  const fileInputRef = useRef(null);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('My recipes');

  const { userId } = useParams();

  const {
    data: personalRecipes,
    isLoading: isLoadingPersonalRecipes,
    refetch: refetchPersonalRecipes,
  } = useGetOwnRecipesQuery();

  const { data: favoriteRecipes, isLoading: isLoadingFavoriteRecipes } =
    useGetFavoriteRecipesListQuery(token, {
      skip: activeTab !== 'My favorites',
    });

  const { data: followers, isLoading: isLoadingFollowers } =
    useGetFollowersQuery(token, { skip: activeTab !== 'Followers' });

  const { data: following, isLoading: isLoadingFollowing } =
    useGetFollowingsQuery(token, { skip: activeTab !== 'Following' });

  const {
    data: currentUser,
    error: currentUserError,
    isLoading: isLoadingCurrentUser,
  } = useFetchCurrentUserQuery();

  const isCurrentUser = currentUser?._id === userId;

  const { data: userData, error, isLoading } = useGetUserByIdQuery(userId);

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

  const renderContent = () => {
    if (activeTab === 'My recipes') {
      if (isLoadingPersonalRecipes) return <div>Loading...</div>;
      return personalRecipes?.recipes?.length ? (
        <ListItems
          data={personalRecipes.recipes}
          isLoading={isLoadingPersonalRecipes}
          typeOfCard="RecipeCard"
          typeOfList="MyRecipes"
        />
      ) : (
        <p>
          Nothing has been added to your recipes list yet. Please browse our
          recipes and add your favorites for easy access in the future.
        </p>
      );
    } else if (activeTab === 'My favorites') {
      if (isLoadingFavoriteRecipes) return <div>Loading...</div>;
      return favoriteRecipes?.recipes?.length ? (
        <ListItems
          data={favoriteRecipes.recipes}
          isLoading={isLoadingFavoriteRecipes}
          typeOfCard="RecipeCard"
          typeOfList="MyFavoritesRecipes"
        />
      ) : (
        <p>You have no favorite recipes yet. Start exploring and add some!</p>
      );
    } else if (activeTab === 'Followers') {
      if (isLoadingFollowers) return <div>Loading...</div>;
      return followers?.followers?.length ? (
        <ListItems
          data={followers.followers}
          isLoading={isLoadingFollowers}
          typeOfCard="UserCard"
          typeOfList="Followers"
        />
      ) : (
        <p>
          There are currently no followers on your account. Please engage our
          visitors with interesting content and draw their attention to your
          profile.
        </p>
      );
    } else if (activeTab === 'Following') {
      if (isLoadingFollowing) return <div>Loading...</div>;
      return following?.followings?.length ? (
        <ListItems
          data={following.followings}
          isLoading={isLoadingFollowing}
          typeOfCard="UserCard"
          typeOfList="Following"
        />
      ) : (
        <p>
          You&#39;re not following anyone yet. Start following people to see
          their latest updates!
        </p>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (activeTab === 'My recipes') {
      refetchPersonalRecipes();
    }
  }, [activeTab, refetchPersonalRecipes]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleLogOut = async () => {
    setIsLogOutModalOpen(true);
  };

  const closeLogOutModal = () => {
    setIsLogOutModalOpen(false);
  };

  if (isLoading || isLoadingCurrentUser) return <div>Loading user data...</div>;
  if (error || currentUserError)
    return <div>Error: {error?.message || currentUserError?.message}</div>;

  return (
    <>
      <section className="section">
        <Container addClass={cl.container} data-label="userProfile">
          <PathInfo />
          <MainTitle>Profile</MainTitle>
          <Subtitle>
            Reveal your culinary art, share your favorite recipe and create
            gastronomic masterpieces with us.
          </Subtitle>

          <div className={cl.userData}>
            <div className={cl.userWrap}>
              {userData && (
                <div className={cl.userInfo}>
                  <div className={cl.imgWrap}>
                    <img
                      className={cl.userInfoImage}
                      src={userData?.avatar}
                      alt={`${userData?.name}'s avatar`}
                    />
                    {isCurrentUser && (
                      <Button addClass={cl.plusBtn} onClick={handleClick}>
                        <Icon icon="whitePlus" />
                      </Button>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                  </div>

                  <h1>{userData?.name}</h1>
                  <div className={cl.userTextWrap}>
                    <p className={cl.userInfoText}>
                      Email:{' '}
                      <span className={cl.userInfoSpan}>{userData?.email}</span>
                    </p>
                    <p className={cl.userInfoText}>
                      Added recipes:{' '}
                      <span className={cl.userInfoSpan}>
                        {userData?.recipesQty}
                      </span>{' '}
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
              {isCurrentUser && (
                <Button addClass={cl.logoutBtn} onClick={handleLogOut}>
                  Log out
                </Button>
              )}
              {!isCurrentUser && (
                <Button addClass={cl.logoutBtn} onClick={() => {}}>
                  Follow
                </Button>
              )}
            </div>

            <div className={cl.tablistBox}>
              <TabsList activeTab={activeTab} setActiveTab={setActiveTab} />

              <div className={cl.tabContent}>{renderContent()}</div>
            </div>
          </div>

          {isLogOutModalOpen && <LogOutModal onClose={closeLogOutModal} />}
        </Container>
      </section>
    </>
  );
};

export default UserPage;
