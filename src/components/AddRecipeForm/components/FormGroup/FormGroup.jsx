import PropTypes from 'prop-types';
import cl from './formGroup.module.scss';
import Title from '../../../ui/Title';

const FormGroup = ({ label, error, children }) => (
  <div className={cl['form-group']}>
    <Title>{label}</Title>
    {children}
    {error && <p className={cl.error}>{error}</p>}
  </div>
);

FormGroup.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default FormGroup;
