import PropTypes from 'prop-types';
import cl from './fileInput.module.scss';

const FileInput = ({ id, register, onChange, imagePreview }) => (
  <>
    <input
      type="file"
      {...register}
      accept="image/*"
      onChange={onChange}
      className={cl['file-input']}
      id={id}
    />
    <label htmlFor={id} className={cl['file-input-label']}>
      Choose a file
    </label>
    {imagePreview && (
      <img src={imagePreview} alt="Preview" className={cl.preview} />
    )}
  </>
);

FileInput.propTypes = {
  id: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  imagePreview: PropTypes.string,
};

export default FileInput;
