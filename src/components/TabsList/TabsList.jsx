import cl from './tabsList.module.scss';

const TABS = ['My recipes', 'My favorites', 'Followers', 'Following'];

const TabsList = () => {
  return (
    <ul className={cl.className}>
      {TABS.map(tab => (
        <li key={tab}>{tab}</li>
      ))}
    </ul>
  );
};

export default TabsList;
