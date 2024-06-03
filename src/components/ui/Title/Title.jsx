import PropTypes from 'prop-types';
import cl from './title.module.scss';

const Title = ({ children }) => {
  return <h3 className={cl.className}>{children}</h3>;
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;
