import cl from './tabsList.module.scss';

const TABS = ['My recipes', 'My favorites', 'Followers', 'Following'];

const TabsList = ({ activeTab, setActiveTab }) => {
  return (
    <ul className={cl.tabsList}>
      {TABS.map(tab => (
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

export default TabsList;
