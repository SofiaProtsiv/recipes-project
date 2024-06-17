import cl from './tabsList.module.scss';
import PropTypes from 'prop-types';

const TabsForCurrentUser = [
  'My recipes',
  'My favorites',
  'Followers',
  'Following',
];
const TabsForUsers = ['Recipes', 'Followers'];
const TabsList = ({ activeTab, setActiveTab, isCurrentUser }) => {
  const RenderTabs = isCurrentUser ? TabsForCurrentUser : TabsForUsers;
  return (
    <ul className={cl.tabsList}>
      {RenderTabs.map(tab => (
        <li
          key={tab}
          className={activeTab === tab ? cl.active : ''}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </li>
      ))}
    </ul>
  );
};

TabsList.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  isCurrentUser: PropTypes.boolean,
};

export default TabsList;
