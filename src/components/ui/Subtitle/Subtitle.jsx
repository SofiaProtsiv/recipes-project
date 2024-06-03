import PropTypes from 'prop-types';
import cl from './subtitle.module.scss';

const Subtitle = ({ children }) => {
  return <p className={cl.className}>{children}</p>;
};

Subtitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Subtitle;
