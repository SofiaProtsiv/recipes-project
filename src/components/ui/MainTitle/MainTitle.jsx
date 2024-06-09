import PropTypes from 'prop-types';
import cl from './mainTitle.module.scss';

const MainTitle = ({ children }) => {
  return <h2 className={cl.main_title}>{children}</h2>;
};

MainTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainTitle;
