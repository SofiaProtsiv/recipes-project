import PathInfo from '../../components/PathInfo/PathInfo';
import TabsList from '../../components/TabsList';
import Button from '../../components/ui/Button';
import MainTitle from '../../components/ui/MainTitle';
import Subtitle from '../../components/ui/Subtitle/Subtitle';

const UserPage = () => {
  return (
    <>
      <PathInfo />
      <MainTitle>Profile</MainTitle>
      <Subtitle>
        Reveal your culinary art, share your favorite recipe and create
        gastronomic masterpieces with us.
      </Subtitle>
      <Button>Log out</Button>
      <TabsList />
    </>
  );
};

export default UserPage;
