import PropTypes from 'prop-types';
import cl from './container.module.scss';

const Container = ({ children }) => {
  return <div className={cl.className}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
